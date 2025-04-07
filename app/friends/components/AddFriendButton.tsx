"use client";

import { useState } from "react";
import { sendFriendRequest } from "@/app/utils/friendRequests";

export default function AddFriendButton({
  receiverId,
  onSent,
}: {
  receiverId: string;
  onSent: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await sendFriendRequest(receiverId);
      onSent();
    } catch (err) {
      console.error("Failed to send request:", err);
      alert("Failed to send request: ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="px-3 py-1.5 rounded-3xl text-sm font-medium bg-[#34339B] text-white"
      onClick={handleClick}
      disabled={loading}
    >
      Send Friend Request
    </button>
  );
}
