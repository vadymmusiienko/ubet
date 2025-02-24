import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Create an admin user
    const user = await prisma.user.upsert({
        where: { username: "admin" },
        update: {},
        create: {
            id: "testid",
            firstName: "John",
            lastName: "Doe",
            username: "admin",
            email: "admin@gmail.com",
            picture: "linktoapicture",
        },
    });

    console.log({ user });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
