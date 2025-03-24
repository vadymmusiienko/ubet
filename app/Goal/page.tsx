"use client";
import { useState } from "react";

export default function CreateGoal() {
  const [goalType, setGoalType] = useState("individual");
  const [goalTitle, setGoalTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stakes, setStakes] = useState(50);
  const [canInviteFriends, setCanInviteFriends] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-6">

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-10 w-2/3 max-w-lg">
        <h1 className="text-xl font-bold mb-4 text-center">Create a goal</h1>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 ${goalType === "group" ? "bg-gray-700 text-white" : "bg-gray-300"}`}
            onClick={() => setGoalType("group")}
          >
            Group
          </button>
          <button
            className={`px-4 py-2 ${goalType === "individual" ? "bg-gray-700 text-white" : "bg-gray-300"}`}
            onClick={() => setGoalType("individual")}
          >
            Individual
          </button>
        </div>
        
        <h1 className="text-xl mb-4 text">Goal title</h1>
        <textarea
          placeholder="Write goal details here..."
          className="w-full p-2 border rounded mb-4"
          value={goalTitle}
          onChange={(e) => setGoalTitle(e.target.value)}
        />
        
        <div className="flex justify-between mb-4">
          <div>
            <label>Start date</label>
            <input type="date" className="border p-2 rounded w-full" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label>End date</label>
            <input type="date" className="border p-2 rounded w-full" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        
        <label>Stakes</label>
        <input type="range" min="0" max="100" value={stakes} onChange={(e) => setStakes(parseInt(e.target.value))} className="w-full mb-4" />
        
        <div className="flex space-x-2 mb-4">
          <button className="bg-gray-300 px-4 py-2 rounded">+ Add accountability partner</button>
          <button className="bg-gray-300 px-4 py-2 rounded">+ Add friends</button>
        </div>
        
        <div className="flex items-center mb-4">
          <input type="checkbox" checked={canInviteFriends} onChange={() => setCanInviteFriends(!canInviteFriends)} className="mr-2" />
          <span>Can friends invite?</span>
        </div>
        
        <button className="bg-blue-500 text-white px-6 py-2">Pay now</button>
      </div>
    </div>
  );
}