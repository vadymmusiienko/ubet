import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface Users {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  picture: string | null;
}

interface UserResult {
  users: Users[];
  error?: string;
}

export async function getSuggestedFriends(): Promise<UserResult> {
  try {
    const { getUser } = getKindeServerSession();
    const sessionUser = await getUser();

    if (!sessionUser?.id) {
      return {
        users: [],
        error: "Not authenticated",
      };
    }

    const currentUserId = sessionUser.id;

    // Find all friends of the current user
    const userFriends = await prisma.friend.findMany({
      where: { userId: currentUserId },
      select: { friendId: true },
    });
    const friendIds = userFriends.map((f) => f.friendId);

    // find all sent friend requests for the current user
    const sentFriendRequests = await prisma.friendRequest.findMany({
      where: {
        senderId: currentUserId,
        status: "PENDING", // Only pending requests
      },
      select: { receiverId: true },
    });

    const sentRequestIds = sentFriendRequests.map((r) => r.receiverId);

    // Find friends of friends
    const friendsOfFriends = await prisma.friend.findMany({
      where: {
        userId: { in: friendIds },
        friendId: { notIn: [currentUserId, ...friendIds, ...sentRequestIds] }, // exclude current user and direct friends
      },
      select: { friendId: true },
    });
    const friendsOfFriendsIds = [
      ...new Set(friendsOfFriends.map((f) => f.friendId)),
    ];

    let candidateIds = friendsOfFriendsIds.slice(0, 4);

    // Get random users if we don't have enough friends of friends

    if (candidateIds.length < 4) {
      const extraUsers = await prisma.user.findMany({
        where: {
          id: {
            notIn: [
              currentUserId,
              ...friendIds,
              ...sentRequestIds,
              ...candidateIds,
            ],
          },
        },
        select: { id: true },
        take: 4 - candidateIds.length,
        orderBy: { createdAt: "desc" }, // just does newest users, can edit to random later
      });

      candidateIds = [...candidateIds, ...extraUsers.map((u) => u.id)];
    }

    // get suggested friends
    const users = await prisma.user.findMany({
      where: { id: { in: candidateIds } },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        picture: true,
      },
    });

    return { users };
  } catch (error) {
    console.error("Failed to fetch suggested friends:", error);
    return {
      users: [],
      error: "Failed to load suggested friends. Please try again later.",
    };
  }
}

export async function getFriendsList(): Promise<UserResult> {
  try {
    const { getUser } = getKindeServerSession();
    const sessionUser = await getUser();

    if (!sessionUser?.id) {
      return {
        users: [],
        error: "Not authenticated",
      };
    }

    const currentUserId = sessionUser.id;

    const friends = await prisma.friend.findMany({
      where: { userId: currentUserId },
      select: { friendId: true },
    });

    const friendIds = friends.map((f) => f.friendId);

    const users = await prisma.user.findMany({
      where: { id: { in: friendIds } },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        picture: true,
      },
      take: 4,
    });

    return { users };
  } catch (error) {
    console.error("Failed to fetch suggested friends:", error);
    return {
      users: [],
      error: "Failed to load suggested friends. Please try again later.",
    };
  }
}
