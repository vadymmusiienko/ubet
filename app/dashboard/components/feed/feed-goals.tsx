import { getGoals } from "../../actions";
import GoalCard from "./goal-card";
import ClientPaginationControls from "./client-pagination-controls";
import Link from "next/link";

interface GoalsProps {
    page: number;
    feedType: string;
}

export default async function FeedGoals({ page, feedType }: GoalsProps) {
    const { goals, pagination, error } = await getGoals(page);

    if (error) {
        return (
            <div className="w-full p-6 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-red-600 font-medium mb-3">{error}</p>
                <button className="mt-2 bg-purple-700 hover:bg-purple-800 transition-colors text-white px-4 py-2 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none">
                    Try Again
                </button>
            </div>
        );
    }

    if (goals.length === 0) {
        return (
            <div className="w-full p-8 bg-githubDark border border-gray-200 rounded-lg text-center">
                <p className="text-gray-600 mb-4">
                    No goals found. Ready to set your first achievement?
                </p>
                {/* Link to the goal creation page */}
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
        <>
            <div className="space-y-5">
                {goals.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        title={goal.title}
                        startDate={goal.startDate.toDateString()}
                        endDate={goal.endDate.toDateString()}
                        description={goal.description}
                    />
                ))}
            </div>

            <div className="mt-6 pb-2">
                <ClientPaginationControls
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    feedType={feedType}
                />
            </div>
        </>
    );
}
