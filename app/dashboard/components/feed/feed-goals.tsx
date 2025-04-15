import { getGoals } from "../../actions";
import GoalCard from "./goal-card";
import ClientPaginationControls from "./client-pagination-controls";

interface GoalsProps {
    page: number;
    feedType: string;
}

export default async function FeedGoals({ page, feedType }: GoalsProps) {
    const { goals, pagination, error } = await getGoals(page);

    if (error) {
        return (
            <div className="w-full p-6 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-red-600">{error}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Try Again
                </button>
            </div>
        );
    }

    if (goals.length === 0) {
        return (
            <div className="w-full p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <p className="text-gray-600">
                    No goals found. Create your first goal!
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="w-full space-y-4">
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
            <ClientPaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                feedType={feedType}
            />
        </>
    );
}
