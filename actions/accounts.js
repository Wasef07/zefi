"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

export async function updateDefaultAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    const account = await db.account.update({
      where: {
        id: data.id,
        userId: user.id,
      },
      data: {
        isDefault: data.isDefault,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAccountWithTransactions(accountId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) {
    throw new Error("User not found");
  }
  const account = await db.account.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
    include: {
      transactions: {
        orderBy: {
          date: "desc",
        },
      },
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });
  if (!account) {
    return null;
  }
  const serializedAccount = serializeTransaction(account);
  serializedAccount.transactions =
    account.transactions.map(serializeTransaction);
  return serializedAccount;
}

export async function bulkDeleteTransactions(transactionIds) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({ where: { clerkUserId: userId } });

    if (!user) {
      throw new Error("User not found");
    }
    const transactions = await db.transaction.findMany({
      where: {
        id: {
          in: transactionIds,
        },
        userId: user.id,
      },
    });

    const accountBalanceChanges = transactions.reduce((acc, transaction) => {
      const change =
        transaction.type === "EXPENSE"
          ? parseFloat(transaction.amount)
          : -parseFloat(transaction.amount);
      acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
      return acc;
    }, {});
    await db.$transaction(async (prisma) => {
      try {
        const result = await prisma.transaction.deleteMany({
          where: {
            id: { in: transactionIds },
            userId: user.id,
          },
        });

        for (const [accountId, balanceChange] of Object.entries(
          accountBalanceChanges,
        )) {
          await prisma.account.update({
            where: { id: accountId },
            data: { balance: { increment: balanceChange } },
          });
        }
      } catch (innerError) {
        throw innerError;
      }
    });
    revalidatePath("/dashboard");
    revalidatePath("/account", "layout");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
