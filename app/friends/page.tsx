import { prisma } from "@/lib/prisma";
import AddFriendButton from "./components/AddFriendButton";
import RespondToFriendRequest from "./components/RespondToFriendRequest";

const CURRENT_USER_ID = "testid";

export default async function FriendsPage() {
  const sentRequests = await prisma.friendRequest.findMany({
    where: { senderId: CURRENT_USER_ID },
    select: { receiverId: true },
  });

  const receivedRequests = await prisma.friendRequest.findMany({
    where: { receiverId: CURRENT_USER_ID },
    select: { senderId: true },
  });

  const excludedIds = [
    CURRENT_USER_ID,
    ...sentRequests.map((r) => r.receiverId),
    ...receivedRequests.map((r) => r.senderId),
  ];

  const suggested = await prisma.user.findMany({
    where: {
      id: { not: CURRENT_USER_ID, notIn: excludedIds },
    },
    take: 5,
  });

  const incomingRequests = await prisma.friendRequest.findMany({
    where: {
      receiverId: CURRENT_USER_ID,
      status: "PENDING",
    },
    include: { sender: true },
  });

  const friends = await prisma.friend.findMany({
    where: { userId: CURRENT_USER_ID },
  });

  const friendIds = friends.map((f) => f.friendId);

  const friendUsers = await prisma.user.findMany({
    where: { id: { in: friendIds } },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
    },
  });

  const friendMap = Object.fromEntries(
    friendUsers.map((user) => [user.id, user])
  );

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Friends System Test Page</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Incoming Friend Requests</h2>
        {incomingRequests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          incomingRequests.map((req) => (
            <div key={req.id} className="flex items-center justify-between">
              <span>
                {req.sender.firstName} {req.sender.lastName} (
                {req.sender.username})
              </span>
              <RespondToFriendRequest requestId={req.id} />
            </div>
          ))
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Suggested Friends</h2>
        {suggested.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-2">
            <span>
              {user.firstName} {user.lastName} (@{user.username})
            </span>
            <AddFriendButton senderId={CURRENT_USER_ID} receiverId={user.id} />
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Friends List</h2>
        {friends.length === 0 ? (
          <p>You don’t have any friends yet.</p>
        ) : (
          <ul>
            {friends.map((f) => {
              const friend = friendMap[f.friendId];
              return (
                <li key={f.friendId}>
                  {friend
                    ? `${friend.firstName} ${friend.lastName} (@${friend.username})`
                    : "Unknown user"}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
