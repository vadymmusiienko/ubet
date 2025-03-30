// TODO: Aneesh - Make this component access the database and display all of the user's goals

"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import FeedToggle from "./components/feedToggle";
import MyGoalCard from "./components/myGoalCard";
import FeedGoalCard from "./components/feedGoalCard";

export default function CreateGoal() {
  const [feedType, setFeedType] = useState("feed");

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* Feed Toggle Positioned at the Top */}
      <div className="w-full max-w-5xl mb-4">
        <FeedToggle feedType={feedType} setFeedType={setFeedType} />
      </div>

      {/* Main Content Layout */}
      <div className="w-full max-w-5xl flex gap-4">
        {/* Profile Card (Left Column) */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <FaUserCircle size={50} />
            <h2 className="text-lg font-semibold">William Haspel</h2>
            <p className="text-sm text-gray-600">
              Just trying my best out here
            </p>
            <p className="text-sm font-bold">Total winnings: -$2</p>
            <p className="text-sm">32 friends</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
              Visit profile
            </button>
          </div>
        </div>

        {/* Goals Section (Middle Column) */}
        <div className="flex-1 space-y-4">
          {feedType === "engagements" ? <MyGoalCard /> : <FeedGoalCard />}
        </div>
        {/* Aneesh - Your code should go here (you will probably want to use "map" function) */}

        {/* Sidebar (Right Column) */}
        <div className="w-1/4 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">People you may know</h2>
            <ul className="text-sm mt-2">
              <li>Angie Zhou (@angiezh)</li>
              <li>John Smith (@johnsmith)</li>
              <li>Jane Doe (@janedoe)</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Trending Goals</h2>
            <ul className="text-sm mt-2">
              <li>Fitness challenge</li>
              <li>No phone challenge</li>
              <li>Romance challenge</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
