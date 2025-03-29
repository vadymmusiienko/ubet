"use server";

import { prisma } from "@/lib/prisma";

export async function placeBet(userId: string, goalId: string, amount: number, betType: "FOR" | "AGAINST") {
  // Fetch the goal and its existing bets
  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
    include: { Bet: true },
  });

  if (!goal) throw new Error("Goal not found");

  const totalFor = goal.Bet.filter(b => b.betType === "FOR").reduce((sum, b) => sum + b.amount, 0);
  const totalAgainst = goal.Bet.filter(b => b.betType === "AGAINST").reduce((sum, b) => sum + b.amount, 0);

  // Validation logic based on your rules
  if (betType === "AGAINST" && totalAgainst + amount > totalFor) {
    throw new Error("Cannot bet more against than for");
  }

  if (betType === "FOR" && totalFor + amount > totalAgainst + goal.stakes) {
    throw new Error("Total FOR bets exceed allowed limit");
  }

  // Create the bet in the database
  const newBet = await prisma.bet.create({
    data: { userId, goalId, amount, betType },
  });

  return newBet;
}
