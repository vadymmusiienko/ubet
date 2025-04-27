"use client";

import { useState } from "react";
import { respondToFriendRequest } from "@/app/friends/utils/friendRequests";

export default function RespondToFriendRequest({
  requestId,
  onResponded,
}: {
  requestId: string;
  onResponded: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: "ACCEPTED" | "DECLINED" | "BLOCKED") => {
    setLoading(true);
    try {
      await respondToFriendRequest(requestId, action);
      onResponded();
    } catch (err) {
      console.error("Failed to respond to friend request:", err);
      alert("Failed to respond");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-1 rounded-xl text-sm font-medium bg-[#339b59] text-white"
        onClick={() => handleAction("ACCEPTED")}
        disabled={loading}
      >
        Accept
      </button>
      <button
        className="px-3 py-1 rounded-xl text-sm font-medium bg-[#c24747] text-white"
        onClick={() => handleAction("DECLINED")}
        disabled={loading}
      >
        Deny
      </button>
      <button
        className="px-3 py-1 rounded-xl text-sm font-medium bg-[#191927] text-white"
        onClick={() => handleAction("BLOCKED")}
        disabled={loading}
      >
        Block
      </button>
    </div>
  );
}
