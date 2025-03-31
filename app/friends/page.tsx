"use client";

import { useEffect, useState } from "react";
import AddFriendButton from "./components/AddFriendButton";
import RespondToFriendRequest from "./components/RespondToFriendRequest";

const CURRENT_USER_ID = "testid5";

export default function FriendsPage() {
  const [incomingRequests, setIncomingRequests] = useState<any[]>([]);
  const [suggested, setSuggested] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);

  const loadAll = async () => {
    const [reqs, sugg, fr] = await Promise.all([
      fetch("/api/friend-request/incoming").then((r) => r.json()),
      fetch("/api/friend-request/suggested").then((r) => r.json()),
      fetch("/api/friends/list").then((r) => r.json()),
    ]);
    setIncomingRequests(reqs);
    setSuggested(sugg);
    setFriends(fr);
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Friends System Test Page</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Incoming Requests</h2>
        {incomingRequests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          incomingRequests.map((req) => (
            <div key={req.id} className="flex justify-between items-center">
              <span>
                {req.sender.firstName} {req.sender.lastName} (@
                {req.sender.username})
              </span>
              <RespondToFriendRequest
                requestId={req.id}
                onResponded={() => {
                  setIncomingRequests((prev) =>
                    prev.filter((r) => r.id !== req.id)
                  );
                  loadAll();
                }}
              />
            </div>
          ))
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Suggested Friends</h2>
        {suggested.map((user) => (
          <div key={user.id} className="flex justify-between items-center">
            <span>
              {user.firstName} {user.lastName} (@{user.username})
            </span>
            <AddFriendButton
              senderId={CURRENT_USER_ID}
              receiverId={user.id}
              onSent={() =>
                setSuggested((prev) => prev.filter((u) => u.id !== user.id))
              }
            />
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Friends List</h2>
        {friends.length === 0 ? (
          <p>No friends yet.</p>
        ) : (
          <ul>
            {friends.map((f) => (
              <li key={f.id}>
                {f.firstName} {f.lastName} (@{f.username})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
