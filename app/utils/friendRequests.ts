export async function sendFriendRequest(senderId: string, receiverId: string) {
  const res = await fetch("/api/friend-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senderId, receiverId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to send friend request");
  return data;
}

export async function respondToFriendRequest(
  requestId: string,
  action: "ACCEPTED" | "DECLINED"
) {
  const res = await fetch("/api/friend-request/respond", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId, action }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to respond to request");
  return data;
}
