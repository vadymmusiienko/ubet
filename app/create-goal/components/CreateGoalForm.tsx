"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { createGoal } from "../actions";

// Define types for better type checking
interface FormErrors {
    goalTitle?: string;
    startDate?: string;
    endDate?: string;
    stakes?: string;
}

interface CreateGoalFormProps {
    userId: string; // The current user's ID
}

export default function CreateGoalForm({ userId }: CreateGoalFormProps) {
    const router = useRouter();
    const [goalType, setGoalType] = useState<"individual" | "group">(
        "individual"
    );
    const [goalTitle, setGoalTitle] = useState<string>("");
    const [goalDetails, setGoalDetails] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [stakes, setStakes] = useState<number>(25);
    const [canInviteFriends, setCanInviteFriends] = useState<boolean>(false);
    const [accountabilityPartnerId, setAccountabilityPartnerId] =
        useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Set default dates when component mounts
    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        setStartDate(formatDateForInput(today));
        setEndDate(formatDateForInput(tomorrow));
    }, []);

    // Format date for input field (YYYY-MM-DD)
    const formatDateForInput = (date: Date): string => {
        return date.toISOString().split("T")[0];
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!goalTitle.trim()) newErrors.goalTitle = "Goal title is required";
        if (!startDate) newErrors.startDate = "Start date is required";
        if (!endDate) newErrors.endDate = "End date is required";

        if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
            newErrors.endDate = "End date must be after start date";
        }

        if (stakes < 0) newErrors.stakes = "Stakes cannot be negative";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setSuccessMessage("");
            setErrorMessage("");

            try {
                // Create goal data object
                const goalData = {
                    title: goalTitle,
                    description: goalDetails,
                    stakes,
                    isGroupGoal: goalType === "group",
                    accountabilityPartnerId: accountabilityPartnerId || null,
                    creatorId: userId,
                    startDate: new Date(startDate).toISOString(),
                    endDate: new Date(endDate).toISOString(),
                    canInviteFriends,
                };

                const result = await createGoal(goalData);

                if (result.success) {
                    setSuccessMessage("Goal created successfully!");
                    resetForm();
                    // Redirect to goal page after a short delay
                    setTimeout(() => {
                        router.push("dashboard?feedType=engagements");
                    }, 500);
                } else {
                    setErrorMessage(
                        result.error ||
                            "Failed to create goal. Please try again."
                    );
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                setErrorMessage(
                    "An unexpected error occurred. Please try again."
                );
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const resetForm = (): void => {
        setGoalType("individual");
        setGoalTitle("");
        setGoalDetails("");
        // Reset to today and tomorrow
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setStartDate(formatDateForInput(today));
        setEndDate(formatDateForInput(tomorrow));
        setStakes(25);
        setCanInviteFriends(false);
        setAccountabilityPartnerId("");
        setErrors({});
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full max-w-md mx-auto"
        >
            {successMessage && (
                <div className="bg-green-600 bg-opacity-20 border border-green-500 text-green-300 px-4 py-2 rounded-lg text-sm">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="bg-red-600 bg-opacity-20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
                    {errorMessage}
                </div>
            )}

            <div className="flex justify-center bg-githubDark p-1 rounded-lg">
                <button
                    type="button"
                    className={`px-4 py-1.5 rounded-md transition-all duration-200 font-medium ${
                        goalType === "group"
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-transparent text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => setGoalType("group")}
                >
                    Group
                </button>
                <button
                    type="button"
                    className={`px-4 py-1.5 rounded-md transition-all duration-200 font-medium ${
                        goalType === "individual"
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-transparent text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => setGoalType("individual")}
                >
                    Individual
                </button>
            </div>

            <div>
                <label
                    htmlFor="goalTitle"
                    className="block text-sm font-medium text-gray-300 mb-1"
                >
                    Goal Title
                </label>
                <input
                    id="goalTitle"
                    type="text"
                    placeholder="Enter your goal title"
                    className={`w-full p-2 bg-gray-800 ${
                        errors.goalTitle ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-200`}
                    value={goalTitle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setGoalTitle(e.target.value)
                    }
                />
                {errors.goalTitle && (
                    <p className="text-red-400 text-xs mt-1">
                        {errors.goalTitle}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="goalDetails"
                    className="block text-sm font-medium text-gray-300 mb-1"
                >
                    Goal Details
                </label>
                <textarea
                    id="goalDetails"
                    placeholder="Write your goal details here..."
                    className="resize-none w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-200"
                    value={goalDetails}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setGoalDetails(e.target.value)
                    }
                    rows={3}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-gray-300 mb-1"
                    >
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        className={`w-full p-2 bg-gray-800 ${
                            errors.startDate
                                ? "border-red-500"
                                : "border-gray-700"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200`}
                        value={startDate}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setStartDate(e.target.value)
                        }
                    />
                    {errors.startDate && (
                        <p className="text-red-400 text-xs mt-1">
                            {errors.startDate}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="endDate"
                        className="block text-sm font-medium text-gray-300 mb-1"
                    >
                        End Date
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        className={`w-full p-2 bg-gray-800 ${
                            errors.endDate
                                ? "border-red-500"
                                : "border-gray-700"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200`}
                        value={endDate}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEndDate(e.target.value)
                        }
                    />
                    {errors.endDate && (
                        <p className="text-red-400 text-xs mt-1">
                            {errors.endDate}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <label
                        htmlFor="stakes"
                        className="text-sm font-medium text-gray-300"
                    >
                        Stakes
                    </label>
                    <span className="text-sm font-medium text-blue-400">
                        ${stakes}
                    </span>
                </div>
                <input
                    id="stakes"
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={stakes}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setStakes(parseInt(e.target.value))
                    }
                    className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 ${
                        errors.stakes ? "outline outline-red-500" : ""
                    }`}
                />
                <div className="flex justify-between text-xs text-gray-400">
                    <span>$0</span>
                    <span>$50</span>
                </div>
                {errors.stakes && (
                    <p className="text-red-400 text-xs mt-1">{errors.stakes}</p>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2 sm:flex-nowrap w-full justify-between">
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            className="bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-gray-300 font-medium text-xs flex items-center transition-colors border border-gray-700"
                            onClick={() => {
                                // This would typically open a modal to select accountability partner
                                // For now, let's just simulate this with a mock ID
                                setAccountabilityPartnerId(
                                    accountabilityPartnerId
                                        ? ""
                                        : "mock-partner-id"
                                );
                            }}
                        >
                            <span className="mr-1">
                                {accountabilityPartnerId ? "✓" : "+"}
                            </span>{" "}
                            Partner
                        </button>
                        <button
                            type="button"
                            className={`bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-gray-300 font-medium text-xs flex items-center transition-colors border border-gray-700 ${
                                goalType !== "group"
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            disabled={goalType !== "group"}
                        >
                            <span className="mr-1">+</span> Friends
                        </button>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0">
                        <input
                            id="canInviteFriends"
                            type="checkbox"
                            checked={canInviteFriends}
                            onChange={() =>
                                setCanInviteFriends(!canInviteFriends)
                            }
                            className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                        />
                        <label
                            htmlFor="canInviteFriends"
                            className="ml-2 text-gray-300 text-xs"
                        >
                            Allow invites
                        </label>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-medium py-2.5 px-4 rounded-lg shadow-md transition-colors text-center
                    ${
                        isSubmitting
                            ? "bg-blue-500 opacity-60 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
            >
                {isSubmitting ? (
                    <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                    </div>
                ) : (
                    "Create Goal"
                )}
            </button>
        </form>
    );
}
