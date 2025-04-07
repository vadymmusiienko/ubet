import { FaUserCircle } from "react-icons/fa";
import { Suspense } from "react";
import MyGoalCard from "./components/myGoalCard";
import { prisma } from "@/lib/prisma";
import ClientPaginationControls from "./components/ClientPaginationControl";

// Types for the goal data
interface Goal {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
}

interface PaginationData {
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
}

interface GoalsResult {
    goals: Goal[];
    pagination: PaginationData;
    error?: string;
}

// Loading component for suspense boundary
function LoadingGoals() {
    return (
        <div className="w-full space-y-4">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="bg-gray-100 p-6 rounded-lg shadow-md animate-pulse h-32"
                />
            ))}
        </div>
    );
}

// Fetch goals with error handling and pagination
async function getGoals(page = 1, pageSize = 5): Promise<GoalsResult> {
    try {
        // Get total count for pagination
        const totalCount = await prisma.goal.count();

        // Calculate pagination
        const skip = (page - 1) * pageSize;
        const totalPages = Math.ceil(totalCount / pageSize);

        // Fetch paginated goals
        const goals = await prisma.goal.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                endDate: true,
            },
            skip,
            take: pageSize,
            orderBy: {
                startDate: "desc",
            },
        });

        return {
            goals,
            pagination: {
                currentPage: page,
                totalPages,
                hasMore: page < totalPages,
            },
        };
    } catch (error) {
        console.error("Failed to fetch goals:", error);
        return {
            goals: [],
            pagination: { currentPage: 1, totalPages: 1, hasMore: false },
            error: "Failed to load goals. Please try again later.",
        };
    }
}

// Goals component with error handling
interface GoalsProps {
    page: number;
}

async function Goals({ page }: GoalsProps) {
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
                    <MyGoalCard
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
            />
        </>
    );
}

interface CreateGoalProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function CreateGoal({ searchParams }: CreateGoalProps) {
    // Await the searchParams promise before accessing its properties
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams?.page) || 1;

    return (
        <div className="min-h-screen flex flex-col items-center p-4 sm:p-6">
            {/* Main Content */}
            <div className="flex flex-col md:flex-row w-full max-w-5xl mt-6 gap-4">
                {/* Profile Card */}
                <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
                    <div className="flex flex-col items-center">
                        <FaUserCircle size={50} />
                        <h2 className="text-lg font-semibold">
                            William Haspel
                        </h2>
                        <p className="text-sm text-gray-600">
                            Just trying my best out here
                        </p>
                        <p className="text-sm font-bold">Total winnings: -$2</p>
                        <p className="text-sm">32 friends</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
                            Visit profile
                        </button>
                    </div>
                </div>

                {/* Goals Section */}
                <div className="w-full md:w-1/2 space-y-4">
                    <Suspense fallback={<LoadingGoals />}>
                        <Goals page={page} />
                    </Suspense>
                </div>

                {/* Sidebar */}
                <div className="w-full md:w-1/4 space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold">
                            People you may know
                        </h2>
                        <ul className="text-sm mt-2">
                            <li>Angie Zhou (@angiezh)</li>
                            <li>John Smith (@johnsmith)</li>
                            <li>Jane Doe (@janedoe)</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold">Trending Goals</h2>
                        <ul className="text-sm mt-2">
                            <li>Fitness challenge</li>
                            <li>No phone challenge</li>
                            <li>Romance challenge</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
