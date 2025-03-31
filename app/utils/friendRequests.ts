export async function sendFriendRequest(senderId: string, receiverId: string) {
  const res = await fetch("/api/friend-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senderId, receiverId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error");
  }

  return res.json();
}

export async function respondToFriendRequest(
  requestId: string,
  action: "ACCEPTED" | "DECLINED" | "BLOCKED"
) {
  const res = await fetch("/api/friend-request/respond", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId, action }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error");
  }

  return res.json();
}
