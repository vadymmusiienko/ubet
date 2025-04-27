import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import GoalCard from "./goal-card";
import Link from "next/link";

export default async function MyGoals() {
    // Get the current user
    const { getUser } = getKindeServerSession();
    const sessionUser = await getUser();

    if (!sessionUser?.id) {
        return (
            <div className="w-full p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <p className="text-gray-600">
                    Please sign in to view your goals
                </p>
            </div>
        );
    }

    try {
        // Fetch goals where the user is a participant or creator
        const goals = await prisma.goal.findMany({
            where: {
                OR: [
                    { creatorId: sessionUser.id },
                    { participants: { some: { userId: sessionUser.id } } },
                ],
            },
            include: {
                creator: true,
            },
            orderBy: {
                startDate: "desc",
            },
        });

        if (goals.length === 0) {
            return (
                <div className="w-full p-8 bg-githubDark border border-gray-200 rounded-lg text-center">
                    <p className="text-gray-600 mb-4">
                        You don&apos;t have any goals yet.
                    </p>
                    <Link
                        href="/create-goal"
                        className="bg-purple-700 hover:bg-purple-800 transition-colors text-white px-6 py-2 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                        Create Goal
                    </Link>
                </div>
            );
        }

        return (
            <div className="space-y-1">
                {goals.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        title={goal.title}
                        description={goal.description}
                        startDate={goal.startDate.toDateString()}
                        endDate={goal.endDate.toDateString()}
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error("Error fetching goals:", error);
        return (
            <div className="w-full p-6 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-red-600 font-medium mb-3">
                    Failed to load your goals
                </p>
                <button className="mt-2 bg-purple-700 hover:bg-purple-800 transition-colors text-white px-4 py-2 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none">
                    Try Again
                </button>
            </div>
        );
    }
}
