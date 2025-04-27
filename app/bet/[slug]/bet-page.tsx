// app/bet/[slug]/bet-page.tsx
"use client";

import { useState, useEffect } from "react";
import { GoalWithRelations, getUserBet } from "./actions";
import BetForm from "./bet-form";
import { BetType, GoalStatus } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

interface BetPageProps {
    goal: GoalWithRelations;
    userId?: string;
}

export default function BetPage({ goal, userId }: BetPageProps) {
    const [userBet, setUserBet] = useState<{
        amount: number;
        betType: BetType;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserBet() {
            if (userId) {
                setLoading(true);
                try {
                    const bet = await getUserBet(userId, goal.id);
                    if (bet) {
                        setUserBet({
                            amount: bet.amount,
                            betType: bet.betType,
                        });
                    }
                } catch (error) {
                    console.error("Failed to fetch user bet:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }

        fetchUserBet();
    }, [userId, goal.id]);

    // Format the end date
    const endDateDisplay = new Date(goal.endDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Calculate time remaining
    const timeRemaining = formatDistanceToNow(new Date(goal.endDate), {
        addSuffix: true,
    });

    // Check if goal is active
    const isActive =
        goal.status === GoalStatus.NOT_STARTED ||
        goal.status === GoalStatus.IN_PROGRESS;

    // Get total bets and statistics
    const totalBets = goal.Bet.length;
    const forBets = goal.Bet.filter(
        (bet) => bet.betType === BetType.FOR
    ).length;
    const againstBets = goal.Bet.filter(
        (bet) => bet.betType === BetType.AGAINST
    ).length;
    const forPercentage =
        totalBets > 0 ? Math.round((forBets / totalBets) * 100) : 0;
    const againstPercentage =
        totalBets > 0 ? Math.round((againstBets / totalBets) * 100) : 0;

    // Calculate total stakes
    const totalStakes = goal.Bet.reduce((sum, bet) => sum + bet.amount, 0);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white py-12 px-4">
            <div className="w-full max-w-3xl">
                <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden mb-6">
                    <div className="px-6 py-8 bg-gradient-to-r from-blue-900 to-purple-900">
                        <h1 className="text-3xl font-bold text-center">
                            {goal.title}
                        </h1>
                        <p className="text-lg text-center text-gray-300 mt-2">
                            Created by {goal.creator.username}
                        </p>
                    </div>

                    <div className="p-6">
                        <div className="mb-6 text-center">
                            <p className="text-lg text-gray-300">
                                {goal.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-sm text-gray-400">Stakes</p>
                                <p className="text-xl font-semibold text-green-400">
                                    ${goal.stakes}
                                </p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-sm text-gray-400">
                                    End Date
                                </p>
                                <p className="text-xl font-semibold text-blue-400">
                                    {endDateDisplay}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {timeRemaining}
                                </p>
                            </div>

                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-sm text-gray-400">Status</p>
                                <p
                                    className={`text-xl font-semibold ${
                                        goal.status === GoalStatus.COMPLETED
                                            ? "text-green-400"
                                            : goal.status === GoalStatus.FAILED
                                            ? "text-red-400"
                                            : goal.status ===
                                              GoalStatus.IN_PROGRESS
                                            ? "text-yellow-400"
                                            : "text-blue-400"
                                    }`}
                                >
                                    {goal.status.replace(/_/g, " ")}
                                </p>
                            </div>
                        </div>

                        {/* Betting statistics */}
                        {totalBets > 0 && (
                            <div className="bg-gray-800 p-4 rounded-lg mb-6">
                                <h3 className="text-lg font-semibold mb-2">
                                    Betting Statistics
                                </h3>
                                <div className="flex justify-between mb-2">
                                    <span>Total bets: {totalBets}</span>
                                    <span>
                                        Total pool: ${totalStakes.toFixed(2)}
                                    </span>
                                </div>
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-200 bg-blue-600">
                                                For ({forBets})
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-200 bg-red-600">
                                                Against ({againstBets})
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-700">
                                        <div
                                            style={{
                                                width: `${forPercentage}%`,
                                            }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                        ></div>
                                        <div
                                            style={{
                                                width: `${againstPercentage}%`,
                                            }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600"
                                        ></div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-400">
                                            {forPercentage}%
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {againstPercentage}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* User bet section with loading state */}
                {userId && (
                    <>
                        {loading ? (
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6 border border-gray-700">
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-8 w-8 text-blue-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <span className="ml-3 text-lg text-gray-300">
                                        Loading your bet...
                                    </span>
                                </div>
                            </div>
                        ) : (
                            userBet && (
                                <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6 border border-gray-700">
                                    <h2 className="text-xl font-bold mb-4">
                                        Your Bet
                                    </h2>
                                    <div
                                        className={`p-4 rounded-lg ${
                                            userBet.betType === BetType.FOR
                                                ? "bg-blue-900/40"
                                                : "bg-red-900/40"
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-lg">
                                                    You bet{" "}
                                                    <span className="font-bold">
                                                        $
                                                        {userBet.amount.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </p>
                                                <p className="text-sm text-gray-300">
                                                    Betting{" "}
                                                    {userBet.betType.toLowerCase()}{" "}
                                                    this goal
                                                </p>
                                            </div>
                                            <div
                                                className={`px-3 py-1 rounded-full text-sm ${
                                                    userBet.betType ===
                                                    BetType.FOR
                                                        ? "bg-blue-600"
                                                        : "bg-red-600"
                                                }`}
                                            >
                                                {userBet.betType}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </>
                )}

                {/* Only show bet form if user hasn't bet yet and goal is active */}
                {!loading && !userBet && isActive && (
                    <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden">
                        <div className="border-t border-gray-800 p-6">
                            <h2 className="text-2xl font-bold text-center mb-6">
                                Place Your Bet
                            </h2>
                            {userId ? (
                                <BetForm
                                    userId={userId}
                                    goalId={goal.id}
                                    goalTitle={goal.title}
                                />
                            ) : (
                                <div className="text-center p-6 bg-gray-800 rounded-lg">
                                    <p className="text-lg mb-4">
                                        Please sign in to place a bet
                                    </p>
                                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors">
                                        Sign In
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Show message if goal is not active */}
                {!isActive && (
                    <div className="bg-gray-800 p-6 rounded-xl text-center">
                        <h3 className="text-xl font-bold mb-2">
                            {goal.status === GoalStatus.COMPLETED
                                ? "Goal Completed!"
                                : "Goal Failed"}
                        </h3>
                        <p className="text-gray-300">
                            This goal is no longer active. Betting is closed.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
