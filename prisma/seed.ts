import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Create an admin user
    const user = await prisma.user.upsert({
        where: { username: "admin" },
        update: {},
        create: {
            firstName: "John",
            lastName: "Doe",
            username: "admin",
            email: "admin@gmail.com",
            password: "chirpchirp", // Should be hashed in production
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
