import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();
console.log("CLERK USER:", user?.id);
  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });
console.log("DB USER FOUND:", loggedInUser);
    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;
 console.log("CREATING USER:", name); 
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
      console.log("USER CREATED:", newUser);
    return newUser;
  } catch (error) {
    console.error("CHECUSER ERROR:", error);
  }
};