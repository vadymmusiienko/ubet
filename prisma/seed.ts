import {
    PrismaClient,
    GoalStatus,
    BetType,
    RequestStatus,
} from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding...`);

    // Create users
    const users = await Promise.all([
        prisma.user.upsert({
            where: { username: "johndoe" },
            update: {},
            create: {
                id: "user1",
                firstName: "John",
                lastName: "Doe",
                username: "johndoe",
                email: "john@example.com",
                picture: "https://randomuser.me/api/portraits/men/1.jpg",
            },
        }),
        prisma.user.upsert({
            where: { username: "janedoe" },
            update: {},
            create: {
                id: "user2",
                firstName: "Jane",
                lastName: "Doe",
                username: "janedoe",
                email: "jane@example.com",
                picture: "https://randomuser.me/api/portraits/women/1.jpg",
            },
        }),
        prisma.user.upsert({
            where: { username: "alicesmith" },
            update: {},
            create: {
                id: "user3",
                firstName: "Alice",
                lastName: "Smith",
                username: "alicesmith",
                email: "alice@example.com",
                picture: "https://randomuser.me/api/portraits/women/2.jpg",
            },
        }),
        prisma.user.upsert({
            where: { username: "bobdavis" },
            update: {},
            create: {
                id: "user4",
                firstName: "Bob",
                lastName: "Davis",
                username: "bobdavis",
                email: "bob@example.com",
                picture: "https://randomuser.me/api/portraits/men/2.jpg",
            },
        }),
    ]);

    console.log(`Created ${users.length} users`);

    // Create friendships and friend requests
    const friendships = await Promise.all([
        // John and Jane are friends
        prisma.friend.create({
            data: {
                userId: "user1",
                friendId: "user2",
            },
        }),
        prisma.friend.create({
            data: {
                userId: "user2",
                friendId: "user1",
            },
        }),
        // John and Bob are friends
        prisma.friend.create({
            data: {
                userId: "user1",
                friendId: "user4",
            },
        }),
        prisma.friend.create({
            data: {
                userId: "user4",
                friendId: "user1",
            },
        }),
        // Alice and Jane are friends
        prisma.friend.create({
            data: {
                userId: "user3",
                friendId: "user2",
            },
        }),
        prisma.friend.create({
            data: {
                userId: "user2",
                friendId: "user3",
            },
        }),
    ]);

    console.log(`Created ${friendships.length} friendships`);

    // Create friend requests
    const friendRequests = await Promise.all([
        // Bob sent a request to Alice
        prisma.friendRequest.create({
            data: {
                senderId: "user4",
                receiverId: "user3",
                status: RequestStatus.PENDING,
            },
        }),
    ]);

    console.log(`Created ${friendRequests.length} friend requests`);

    // Create individual goals
    const individualGoals = await Promise.all([
        prisma.goal.create({
            data: {
                title: "Run a Marathon",
                description: "Complete a full marathon in under 4 hours",
                stakes: 100,
                isGroupGoal: false,
                creatorId: "user1",
                accountabilityPartnerId: "user2",
                startDate: new Date(2025, 3, 1), // April 1, 2025
                endDate: new Date(2025, 8, 30), // September 30, 2025
                status: GoalStatus.IN_PROGRESS,
            },
        }),
        prisma.goal.create({
            data: {
                title: "Learn Spanish",
                description: "Reach B1 level in Spanish",
                stakes: 50,
                isGroupGoal: false,
                creatorId: "user2",
                accountabilityPartnerId: "user1",
                startDate: new Date(2025, 2, 15), // March 15, 2025
                endDate: new Date(2025, 11, 15), // December 15, 2025
                status: GoalStatus.IN_PROGRESS,
            },
        }),
        prisma.goal.create({
            data: {
                title: "Write a Novel",
                description: "Complete a 50,000 word novel draft",
                stakes: 200,
                isGroupGoal: false,
                creatorId: "user3",
                accountabilityPartnerId: "user4",
                startDate: new Date(2025, 5, 1), // June 1, 2025
                endDate: new Date(2025, 10, 30), // November 30, 2025
                status: GoalStatus.NOT_STARTED,
            },
        }),
    ]);

    console.log(`Created ${individualGoals.length} individual goals`);

    // Create group goals
    const groupGoals = await Promise.all([
        prisma.goal.create({
            data: {
                title: "30-Day Fitness Challenge",
                description: "Complete 30 days of consecutive workouts",
                stakes: 150,
                isGroupGoal: true,
                creatorId: "user1",
                startDate: new Date(2025, 4, 1), // May 1, 2025
                endDate: new Date(2025, 4, 30), // May 30, 2025
                status: GoalStatus.NOT_STARTED,
                participants: {
                    create: [
                        { userId: "user1" },
                        { userId: "user2" },
                        { userId: "user3" },
                    ],
                },
            },
        }),
        prisma.goal.create({
            data: {
                title: "Book Club Reading Challenge",
                description: "Read 5 books in 3 months",
                stakes: 75,
                isGroupGoal: true,
                creatorId: "user4",
                startDate: new Date(2025, 3, 15), // April 15, 2025
                endDate: new Date(2025, 6, 15), // July 15, 2025
                status: GoalStatus.IN_PROGRESS,
                participants: {
                    create: [
                        { userId: "user2" },
                        { userId: "user3" },
                        { userId: "user4" },
                    ],
                },
            },
        }),
    ]);

    console.log(`Created ${groupGoals.length} group goals`);

    // Add one completed goal and one failed goal
    const completedGoal = await prisma.goal.create({
        data: {
            title: "Learn to Cook 5 New Recipes",
            description: "Master five new dishes from different cuisines",
            stakes: 80,
            isGroupGoal: false,
            creatorId: "user3",
            accountabilityPartnerId: "user2",
            startDate: new Date(2025, 1, 1), // February 1, 2025
            endDate: new Date(2025, 2, 28), // February 28, 2025
            status: GoalStatus.COMPLETED,
        },
    });

    const failedGoal = await prisma.goal.create({
        data: {
            title: "No Social Media for a Month",
            description:
                "Completely avoid all social media platforms for 30 days",
            stakes: 120,
            isGroupGoal: false,
            creatorId: "user4",
            accountabilityPartnerId: "user1",
            startDate: new Date(2025, 1, 1), // February 1, 2025
            endDate: new Date(2025, 1, 30), // February 30, 2025
            status: GoalStatus.FAILED,
        },
    });

    console.log(`Created completed and failed goal examples`);

    // Create bets
    const bets = await Promise.all([
        // Bets for the marathon goal
        prisma.bet.create({
            data: {
                amount: 50,
                goalId: individualGoals[0].id,
                userId: "user2",
                betType: BetType.FOR,
            },
        }),
        prisma.bet.create({
            data: {
                amount: 25,
                goalId: individualGoals[0].id,
                userId: "user3",
                betType: BetType.AGAINST,
            },
        }),

        // Bets for the Spanish learning goal
        prisma.bet.create({
            data: {
                amount: 30,
                goalId: individualGoals[1].id,
                userId: "user1",
                betType: BetType.FOR,
            },
        }),
        prisma.bet.create({
            data: {
                amount: 20,
                goalId: individualGoals[1].id,
                userId: "user4",
                betType: BetType.AGAINST,
            },
        }),

        // Bets for the novel writing goal
        prisma.bet.create({
            data: {
                amount: 100,
                goalId: individualGoals[2].id,
                userId: "user4",
                betType: BetType.FOR,
            },
        }),

        // Bets for the fitness challenge goal
        prisma.bet.create({
            data: {
                amount: 40,
                goalId: groupGoals[0].id,
                userId: "user4",
                betType: BetType.FOR,
            },
        }),

        // Bets for the book club goal
        prisma.bet.create({
            data: {
                amount: 25,
                goalId: groupGoals[1].id,
                userId: "user1",
                betType: BetType.FOR,
            },
        }),

        // Bets for the completed goal
        prisma.bet.create({
            data: {
                amount: 45,
                goalId: completedGoal.id,
                userId: "user2",
                betType: BetType.FOR,
            },
        }),
        prisma.bet.create({
            data: {
                amount: 30,
                goalId: completedGoal.id,
                userId: "user1",
                betType: BetType.FOR,
            },
        }),

        // Bets for the failed goal
        prisma.bet.create({
            data: {
                amount: 60,
                goalId: failedGoal.id,
                userId: "user1",
                betType: BetType.FOR,
            },
        }),
        prisma.bet.create({
            data: {
                amount: 40,
                goalId: failedGoal.id,
                userId: "user3",
                betType: BetType.AGAINST,
            },
        }),
    ]);

    console.log(`Created ${bets.length} bets`);
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
