"use client";
import { useState, useTransition } from "react";
import { placeBet } from "@/app/bet/actions";

interface BetFormProps {
    userId: string;
    goalId: string;
}

export default function BetForm({ userId, goalId }: BetFormProps) {
    const [amount, setAmount] = useState("");
    const [betType, setBetType] = useState<"FOR" | "AGAINST">("FOR");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!amount || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        startTransition(async () => {
            try {
                await placeBet(userId, goalId, parseFloat(amount), betType);
                setAmount("");
                setBetType("FOR");
                setSuccess(
                    `Successfully placed a ${betType.toLowerCase()} bet of $${amount}`
                );
            } catch (err) {
                setError((err as Error).message);
            }
        });
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Place Your Bet
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                    <p>{success}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Bet Amount ($)
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
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
                            className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            disabled={isPending}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="betType"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Bet Type
                    </label>
                    <div className="flex gap-2 w-full">
                        <button
                            type="button"
                            onClick={() => setBetType("FOR")}
                            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
                                betType === "FOR"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                            disabled={isPending}
                        >
                            Bet FOR
                        </button>
                        <button
                            type="button"
                            onClick={() => setBetType("AGAINST")}
                            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
                                betType === "AGAINST"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                    className={`w-full rounded-md px-4 py-2 text-sm font-medium text-white ${
                        isPending
                            ? "bg-gray-400 cursor-not-allowed"
                            : betType === "FOR"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-red-600 hover:bg-red-700"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        betType === "FOR"
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
                        `Place ${betType === "FOR" ? "FOR" : "AGAINST"} Bet`
                    )}
                </button>
            </form>

            <p className="mt-4 text-xs text-gray-500">
                Note: All bets are final and cannot be changed after submission.
            </p>
        </div>
    );
}
