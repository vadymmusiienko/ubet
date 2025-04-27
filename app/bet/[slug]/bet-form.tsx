// app/bet/[slug]/bet-form.tsx
"use client";

import { useState, useTransition, useEffect, FormEvent } from "react";
import { placeBet } from "./actions";
import { BetType } from "@prisma/client";

interface BetFormProps {
    userId: string;
    goalId: string;
    defaultAmount?: number;
    goalTitle?: string;
}

export default function BetForm({
    userId,
    goalId,
    defaultAmount = 0,
}: //goalTitle,
BetFormProps) {
    const [amount, setAmount] = useState(
        defaultAmount ? defaultAmount.toString() : ""
    );
    const [betType, setBetType] = useState<BetType>(BetType.FOR);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Clear success message after 5 seconds
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!amount || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        // Show confirmation for bets over $100
        if (parseFloat(amount) > 100 && !showConfirmation) {
            setShowConfirmation(true);
            return;
        }

        submitBet();
    };

    const submitBet = () => {
        startTransition(async () => {
            try {
                await placeBet(userId, goalId, parseFloat(amount), betType);
                setAmount("");
                setBetType(BetType.FOR);
                setSuccess(
                    `Successfully placed a ${betType.toLowerCase()} bet of $${amount}`
                );
                setShowConfirmation(false);

                // Reload the page to show new bet status
                window.location.reload();
            } catch (err) {
                setError((err as Error).message);
            }
        });
    };

    return (
        <div className="w-full max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            {error && (
                <div className="mb-4 p-3 bg-red-900/50 border-l-4 border-red-500 text-red-200 rounded">
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-900/50 border-l-4 border-green-500 text-green-200 rounded">
                    <p>{success}</p>
                </div>
            )}

            {showConfirmation ? (
                <div className="space-y-4">
                    <div className="p-4 bg-yellow-900/50 border-l-4 border-yellow-500 text-yellow-200 rounded">
                        <p className="font-medium">
                            Confirm your bet of ${amount}
                        </p>
                        <p className="text-sm mt-1">
                            You are about to place a {betType.toLowerCase()} bet
                            of ${amount}. This action cannot be undone.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowConfirmation(false)}
                            className="flex-1 px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={submitBet}
                            className={`flex-1 px-4 py-2 rounded-md text-white transition-colors ${
                                betType === BetType.FOR
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-red-600 hover:bg-red-700"
                            }`}
                        >
                            Confirm Bet
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-200"
                        >
                            Bet Amount ($)
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-400 sm:text-sm">
                                    $
                                </span>
                            </div>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="block w-full pl-7 pr-12 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-200 sm:text-sm"
                                disabled={isPending}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="betType"
                            className="block text-sm font-medium text-gray-200"
                        >
                            Bet Type
                        </label>
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <button
                                type="button"
                                onClick={() => setBetType(BetType.FOR)}
                                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                                    betType === BetType.FOR
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                                disabled={isPending}
                            >
                                Bet FOR
                            </button>
                            <button
                                type="button"
                                onClick={() => setBetType(BetType.AGAINST)}
                                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                                    betType === BetType.AGAINST
                                        ? "bg-red-600 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                                disabled={isPending}
                            >
                                Bet AGAINST
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className={`w-full rounded-md px-4 py-3 text-sm font-medium text-white transition-colors ${
                            isPending
                                ? "bg-gray-600 cursor-not-allowed"
                                : betType === BetType.FOR
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-red-600 hover:bg-red-700"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                            betType === BetType.FOR
                                ? "focus:ring-blue-500"
                                : "focus:ring-red-500"
                        }`}
                    >
                        {isPending ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                Placing Bet...
                            </div>
                        ) : (
                            `Place ${
                                betType === BetType.FOR ? "FOR" : "AGAINST"
                            } Bet`
                        )}
                    </button>
                </form>
            )}

            <div className="mt-4 text-xs text-gray-400">
                <p>
                    Note: All bets are final and cannot be changed after
                    submission.
                </p>
                <p className="mt-1">
                    Betting {betType === BetType.FOR ? "FOR" : "AGAINST"} means
                    you expect the goal to be{" "}
                    {betType === BetType.FOR
                        ? "completed successfully"
                        : "not completed"}
                    .
                </p>
            </div>
        </div>
    );
}
