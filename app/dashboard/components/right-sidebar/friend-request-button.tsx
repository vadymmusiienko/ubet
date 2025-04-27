"use client";
import { sendFriendRequest } from "@/app/friends/utils/friendRequests";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export function FriendRequestButton({ receiverId }: { receiverId: string }) {
  const [sent, setSent] = useState(false);

  const handleSendRequest = async () => {
    try {
      await sendFriendRequest(receiverId);
      setSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleSendRequest}
      disabled={sent}
      className={`text-xs font-semibold py-1 px-3 rounded-full flex items-center justify-center
        ${sent ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
        text-white transition`}
    >
      {<UserPlus />}
    </button>
  );
}
