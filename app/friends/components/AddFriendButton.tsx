"use client";

import { useState } from "react";
import { sendFriendRequest } from "@/app/utils/friendRequests";

export default function AddFriendButton({
  senderId,
  receiverId,
  onSent,
}: {
  senderId: string;
  receiverId: string;
  onSent: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await sendFriendRequest(senderId, receiverId);
      onSent(); // remove from suggested
    } catch (err) {
      alert("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      Send Friend Request
    </button>
  );
}
