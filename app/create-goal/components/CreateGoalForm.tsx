"use client";
import { useState } from "react";

export default function CreateGoalForm() {
    const [goalType, setGoalType] = useState("individual");
    const [goalTitle, setGoalTitle] = useState("");
    const [goalDetails, setGoalDetails] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [stakes, setStakes] = useState(25);
    const [canInviteFriends, setCanInviteFriends] = useState(false);

    return (
        <div className="space-y-4 w-full max-w-md mx-auto">
            <div className="flex justify-center bg-gray-100 p-1 rounded-lg">
                <button
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Title
                </label>
                <input
                    type="text"
                    placeholder="Enter your goal title"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Details
                </label>
                <textarea
                    placeholder="Write your goal details here..."
                    className="resize-none w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                    value={goalDetails}
                    onChange={(e) => setGoalDetails(e.target.value)}
                    rows={2}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">
                        Stakes
                    </label>
                    <span className="text-sm font-medium text-blue-600">
                        ${stakes}
                    </span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="50"
                    value={stakes}
                    onChange={(e) => setStakes(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>$0</span>
                    <span>$50</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2 sm:flex-nowrap w-full justify-between">
                    <div className="flex flex-wrap gap-2">
                        <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-gray-700 font-medium text-xs flex items-center transition-colors">
                            <span className="mr-1">+</span> Partner
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-gray-700 font-medium text-xs flex items-center transition-colors">
                            <span className="mr-1">+</span> Friends
                        </button>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0">
                        <input
                            type="checkbox"
                            checked={canInviteFriends}
                            onChange={() =>
                                setCanInviteFriends(!canInviteFriends)
                            }
                            className="w-3 h-3 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        />
                        <span className="ml-1 text-gray-700 text-xs">
                            Allow invites
                        </span>
                    </div>
                </div>
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors text-center">
                Pay Now
            </button>
        </div>
    );
}
