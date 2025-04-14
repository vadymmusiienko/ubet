"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";

// Define error types for proper type checking
interface FormErrors {
    goalTitle?: string;
    startDate?: string;
    endDate?: string;
    stakes?: string;
}

export default function CreateGoalForm() {
    const [goalType, setGoalType] = useState<"individual" | "group">(
        "individual"
    );
    const [goalTitle, setGoalTitle] = useState<string>("");
    const [goalDetails, setGoalDetails] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [stakes, setStakes] = useState<number>(25);
    const [canInviteFriends, setCanInviteFriends] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors>({});

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
            try {
                console.log("Form submitted successfully", {
                    goalType,
                    goalTitle,
                    goalDetails,
                    startDate,
                    endDate,
                    stakes,
                    canInviteFriends,
                });
                // TODO: Handle form submission logic (e.g., Database call)

                // Handle success - could reset form or redirect
                alert("Goal created successfully!");
                resetForm();
            } catch (error) {
                console.error("Error submitting form:", error);
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
        setErrors({});
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full max-w-md mx-auto"
        >
            <div className="flex justify-center bg-gray-100 p-1 rounded-lg">
                <button
                    type="button"
                    className={`px-4 py-1.5 rounded-md transition-all duration-200 font-medium ${
                        goalType === "group"
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-transparent text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setGoalType("group")}
                >
                    Group
                </button>
                <button
                    type="button"
                    className={`px-4 py-1.5 rounded-md transition-all duration-200 font-medium ${
                        goalType === "individual"
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-transparent text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setGoalType("individual")}
                >
                    Individual
                </button>
            </div>

            <div>
                <label
                    htmlFor="goalTitle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Goal Title
                </label>
                <input
                    id="goalTitle"
                    type="text"
                    placeholder="Enter your goal title"
                    className={`w-full p-2 border ${
                        errors.goalTitle ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all`}
                    value={goalTitle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setGoalTitle(e.target.value)
                    }
                />
                {errors.goalTitle && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.goalTitle}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="goalDetails"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Goal Details
                </label>
                <textarea
                    id="goalDetails"
                    placeholder="Write your goal details here..."
                    className="resize-none w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                    value={goalDetails}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setGoalDetails(e.target.value)
                    }
                    rows={2}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        className={`w-full p-2 border ${
                            errors.startDate
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none`}
                        value={startDate}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setStartDate(e.target.value)
                        }
                    />
                    {errors.startDate && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.startDate}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="endDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        End Date
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        className={`w-full p-2 border ${
                            errors.endDate
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none`}
                        value={endDate}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEndDate(e.target.value)
                        }
                    />
                    {errors.endDate && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.endDate}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <label
                        htmlFor="stakes"
                        className="text-sm font-medium text-gray-700"
                    >
                        Stakes
                    </label>
                    <span className="text-sm font-medium text-blue-600">
                        ${stakes}
                    </span>
                </div>
                <input
                    id="stakes"
                    type="range"
                    min="0"
                    max="50"
                    value={stakes}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setStakes(parseInt(e.target.value))
                    }
                    className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 ${
                        errors.stakes ? "outline outline-red-500" : ""
                    }`}
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>$0</span>
                    <span>$50</span>
                </div>
                {errors.stakes && (
                    <p className="text-red-500 text-xs mt-1">{errors.stakes}</p>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2 sm:flex-nowrap w-full justify-between">
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-gray-700 font-medium text-xs flex items-center transition-colors"
                        >
                            <span className="mr-1">+</span> Partner
                        </button>
                        <button
                            type="button"
                            className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-gray-700 font-medium text-xs flex items-center transition-colors"
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
                            className="w-3 h-3 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        />
                        <label
                            htmlFor="canInviteFriends"
                            className="ml-1 text-gray-700 text-xs"
                        >
                            Allow invites
                        </label>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-medium py-2 px-4 rounded-lg shadow-md transition-colors text-center
                    ${
                        isSubmitting
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
            >
                {isSubmitting ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
}
