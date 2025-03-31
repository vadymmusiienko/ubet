"use client";

import { useState } from "react";
import { respondToFriendRequest } from "@/app/utils/friendRequests";

export default function RespondToFriendRequest({
  requestId,
  onResponded,
}: {
  requestId: string;
  onResponded: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: "ACCEPTED" | "DECLINED") => {
    setLoading(true);
    try {
      await respondToFriendRequest(requestId, action);
      onResponded();
    } catch (err) {
      alert("Failed to respond");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => handleAction("ACCEPTED")} disabled={loading}>
        Accept
      </button>
      <button onClick={() => handleAction("DECLINED")} disabled={loading}>
        Deny
      </button>
    </div>
  );
}
