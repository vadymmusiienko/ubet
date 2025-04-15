"use client";

import { useEffect, useState } from "react";
import AddFriendButton from "./components/AddFriendButton";
import RespondToFriendRequest from "./components/RespondToFriendRequest";
import type { User, FriendRequest } from "@prisma/client";

type FriendRequestWithSender = FriendRequest & {
  sender: User;
};

type FriendUser = Pick<User, "id" | "firstName" | "lastName" | "username">;

export default function FriendsPage() {
  const [incomingRequests, setIncomingRequests] = useState<
    FriendRequestWithSender[]
  >([]);
  const [suggested, setSuggested] = useState<User[]>([]);
  const [friends, setFriends] = useState<FriendUser[]>([]);

  const loadAll = async () => {
    const reqs = await fetch("/api/friend-request/incoming").then((r) =>
      r.json()
    );
    const sugg = await fetch("/api/friend-request/suggested").then((r) =>
      r.json()
    );
    const fr = await fetch("/api/friends/list").then((r) => r.json());

    setIncomingRequests(reqs);
    setSuggested(sugg);
    setFriends(fr);
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="flex justify-center p-8 bg-gray-100 min-h-screen">
      <div className="min-w-[600px] w-full max-w-3xl rounded-xl overflow-hidden shadow-lg bg-white text-left p-6 space-y-8">
        <h1 className="text-2xl font-bold">Friends Page</h1>

        <section>
          <h2 className="text-xl font-semibold mb-2">Incoming Requests</h2>
          {incomingRequests.length === 0 ? (
            <p>No pending requests.</p>
          ) : (
            incomingRequests.map((req) => (
              <div
                key={req.id}
                className="flex space-y-2 justify-between items-center"
              >
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
          <div className="space-y-2">
            {suggested.map((user) => (
              <div key={user.id} className="flex justify-between items-center">
                <span>
                  {user.firstName} {user.lastName} (@{user.username})
                </span>
                <AddFriendButton
                  receiverId={user.id}
                  onSent={() => {
                    setSuggested((prev) =>
                      prev.filter((u) => u.id !== user.id)
                    );
                    loadAll();
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Friends List</h2>
          {friends.length === 0 ? (
            <p className="text-gray-600">No friends yet.</p>
          ) : (
            <ul className="space-y-2">
              {friends.map((f) => (
                <li key={f.id} className="border rounded-lg p-3">
                  {f.firstName} {f.lastName} (@{f.username})
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
