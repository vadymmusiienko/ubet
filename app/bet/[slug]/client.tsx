"use client";
import { Goal, User, Bet, GoalParticipant } from "@prisma/client";
import BetForm from "./bet-form";

type GoalWithRelations = Goal & {
    creator: User;
    accountabilityPartner: User | null;
    participants: (GoalParticipant & { user: User })[];
    Bet: Bet[];
};

export default function BetPageClient({ goal }: { goal: GoalWithRelations }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">
                {goal.title.toUpperCase()}
            </h1>
            <div className="mb-6 text-center">
                <p className="text-lg">{goal.description}</p>
                <p className="mt-2">Stakes: ${goal.stakes}</p>
                <p>End Date: {new Date(goal.endDate).toLocaleDateString()}</p>
                <p>Status: {goal.status}</p>
            </div>
            <p className="text-lg mb-4">Place your bets here!</p>
            <BetForm userId="123" goalId={goal.id} />
        </div>
    );
}
