// Protected database actions
"use server";
import { prisma } from "../lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// Returns true if authenticated and false if not
export async function isAuth() {
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        throw new Error("Not authenticated!");
    }
}

// Creates a new user in our database (copies the user from Kinde)
export async function updateUser() {
    //TODO Make sure the user is signed in
    //isAuth();

    // Get user's information
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Not logged in
    if (!user?.id) {
        return;
    }

    // Create a new user if doesn't exist or update the existing one
    await prisma.user.upsert({
        where: { id: user.id },
        create: {
            id: user.id,
            firstName: user.given_name || "",
            lastName: user.family_name || "",
            username: user.username || user.email?.replace(/@.*/, "") || "",
            email: user.email || "",
            picture: user.picture,
        },
        update: {},
    });
}
