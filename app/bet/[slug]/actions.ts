// app/bet/[slug]/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import {
    Goal,
    User,
    Bet,
    GoalParticipant,
    BetType,
    GoalStatus,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

export type GoalWithRelations = Goal & {
    creator: User;
    accountabilityPartner: User | null;
    participants: (GoalParticipant & { user: User })[];
    Bet: (Bet & { user: User })[];
};

export async function getGoalByTitle(
    title: string
): Promise<GoalWithRelations | null> {
    return prisma.goal.findFirst({
        where: {
            title: {
                equals: title,
                mode: "insensitive", // Case insensitive search
            },
        },
        include: {
            creator: true,
            accountabilityPartner: true,
            participants: {
                include: {
                    user: true,
                },
            },
            Bet: {
                include: {
                    user: true,
                },
            },
        },
    });
}

export async function placeBet(
    userId: string,
    goalId: string,
    amount: number,
    betType: BetType
): Promise<Bet> {
    if (!userId) {
        throw new Error("You must be logged in to place a bet");
    }

    if (!goalId) {
        throw new Error("Goal not found");
    }

    if (amount <= 0) {
        throw new Error("Bet amount must be greater than zero");
    }

    // Get the goal to check its status
    const goal = await prisma.goal.findUnique({
        where: { id: goalId },
    });

    if (!goal) {
        throw new Error("Goal not found");
    }

    // Check if goal is already completed or failed
    if (
        goal.status === GoalStatus.COMPLETED ||
        goal.status === GoalStatus.FAILED
    ) {
        throw new Error(
            "Cannot place bets on goals that are already completed or failed"
        );
    }

    // Check if user is the creator or accountability partner
    if (goal.creatorId === userId || goal.accountabilityPartnerId === userId) {
        throw new Error(
            "You cannot bet on your own goals or goals you're partnered with"
        );
    }

    // Check if user already has bet on this goal
    const existingBet = await prisma.bet.findFirst({
        where: {
            userId,
            goalId,
        },
    });

    if (existingBet) {
        throw new Error("You have already placed a bet on this goal");
    }

    // Create new bet
    const bet = await prisma.bet.create({
        data: {
            userId,
            goalId,
            amount,
            betType,
        },
    });

    // Revalidate the goal page to reflect the new bet
    revalidatePath(`/bet/${encodeURIComponent(goal.title)}`);

    return bet;
}

export async function getUserBet(
    userId: string,
    goalId: string
): Promise<Bet | null> {
    if (!userId || !goalId) return null;

    return prisma.bet.findFirst({
        where: {
            userId,
            goalId,
        },
    });
}
