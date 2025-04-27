"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Goal data validation schema
const GoalSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    stakes: z.number().min(0, "Stakes cannot be negative"),
    isGroupGoal: z.boolean(),
    accountabilityPartnerId: z.string().nullable(),
    creatorId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    canInviteFriends: z.boolean().optional(),
});

// Type for the goal data
type GoalData = z.infer<typeof GoalSchema>;

export async function createGoal(data: GoalData) {
    try {
        // Validate input data
        const validatedData = GoalSchema.parse(data);

        // Create the goal
        const goal = await prisma.goal.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                stakes: validatedData.stakes,
                isGroupGoal: validatedData.isGroupGoal,
                accountabilityPartnerId: validatedData.accountabilityPartnerId,
                creatorId: validatedData.creatorId,
                startDate: new Date(validatedData.startDate),
                endDate: new Date(validatedData.endDate),
                status: "NOT_STARTED",
                // If it's a group goal, add the creator as a participant
                ...(validatedData.isGroupGoal && {
                    participants: {
                        create: {
                            userId: validatedData.creatorId,
                        },
                    },
                }),
            },
        });

        // Revalidate the goals page to reflect new data
        revalidatePath("/goals");

        return {
            success: true,
            goalId: goal.id,
        };
    } catch (error) {
        console.error("Error creating goal:", error);

        if (error instanceof z.ZodError) {
            const errorMessage = error.errors
                .map((e) => `${e.path}: ${e.message}`)
                .join(", ");
            return {
                success: false,
                error: `Validation error: ${errorMessage}`,
            };
        }

        return {
            success: false,
            error: "Failed to create goal. Please try again.",
        };
    }
}
