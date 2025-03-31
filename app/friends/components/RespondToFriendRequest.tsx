"use client";

import { respondToFriendRequest } from "@/app/utils/friendRequests";
import { useState } from "react";

export default function RespondToFriendRequest({
  requestId,
}: {
  requestId: string;
}) {
  const [sent, setSent] = useState(false);

  const handleSend = async (action: "ACCEPTED" | "DECLINED") => {
    try {
      await respondToFriendRequest(requestId, action);
      setSent(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (sent) return;

  return (
    <div className="flex gap-2">
      <button onClick={() => handleSend("ACCEPTED")}>Accept</button>
      <button onClick={() => handleSend("DECLINED")}>Deny</button>
    </div>
  );
}
