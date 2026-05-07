import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function AccountPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    redirect("/");
  }

  const defaultAccount = await db.account.findFirst({
    where: {
      userId: user.id,
      isDefault: true,
    },
  });
  if (!defaultAccount) {
    redirect("/");
  }

  redirect(`/account/${defaultAccount.id}`);
}
