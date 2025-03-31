"use client";

import { sendFriendRequest } from "@/app/utils/friendRequests";
import { useState } from "react";

export default function AddFriendButton({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) {
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    try {
      await sendFriendRequest(senderId, receiverId);
      setSent(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (sent) return <p>Request Sent</p>;

  return <button onClick={handleSend}>Send Friend Request</button>;
}
