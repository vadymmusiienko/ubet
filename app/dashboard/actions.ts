import { prisma } from "@/lib/prisma";

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

// Fetch goals with error handling and pagination
export async function getGoals(
    page = 1,
    pageSize = 3 //TODO - change to 4?
): Promise<GoalsResult> {
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
