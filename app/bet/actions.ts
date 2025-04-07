"use server";
import { prisma } from "@/lib/prisma";
import { BetType } from "@prisma/client";

export async function placeBet(
    userId: string,
    goalId: string,
    amount: number,
    betType: BetType
) {
    // Input validation
    if (!userId || !goalId) {
        throw new Error("Missing required parameters");
    }

    if (amount <= 0) {
        throw new Error("Bet amount must be positive");
    }

    // Use a transaction to ensure data consistency
    return prisma.$transaction(async (tx) => {
        // Fetch the goal and its existing bets
        const goal = await tx.goal.findUnique({
            where: { id: goalId },
            include: { Bet: true },
        });

        if (!goal) {
            throw new Error("Goal not found");
        }

        // Check if goal is still accepting bets
        if (goal.status !== "NOT_STARTED") {
            throw new Error(
                "Cannot place bets on goals that have already started"
            );
        }

        // Verify user exists
        const user = await tx.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Calculate totals with type safety
        const totalFor = goal.Bet.filter(
            (b) => b.betType === BetType.FOR
        ).reduce((sum, b) => sum + b.amount, 0);

        const totalAgainst = goal.Bet.filter(
            (b) => b.betType === BetType.AGAINST
        ).reduce((sum, b) => sum + b.amount, 0);

        // Validation logic based on your rules
        if (betType === BetType.AGAINST && totalAgainst + amount > totalFor) {
            throw new Error("Total AGAINST bets cannot exceed total FOR bets");
        }

        if (
            betType === BetType.FOR &&
            totalFor + amount > totalAgainst + goal.stakes
        ) {
            throw new Error(
                `Total FOR bets cannot exceed ${totalAgainst + goal.stakes}`
            );
        }

        // Create the bet in the database
        const newBet = await tx.bet.create({
            data: {
                userId,
                goalId,
                amount,
                betType,
            },
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
                goal: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        return newBet;
    });
}
