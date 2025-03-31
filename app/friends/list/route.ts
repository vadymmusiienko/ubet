import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const CURRENT_USER_ID = "testid5";

export async function GET() {
  const friendLinks = await prisma.friend.findMany({
    where: { userId: CURRENT_USER_ID },
  });

  const friendIds = friendLinks.map((f) => f.friendId);

  const users = await prisma.user.findMany({
    where: { id: { in: friendIds } },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
    },
  });

  return NextResponse.json(users);
}
