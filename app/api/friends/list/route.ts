import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = user!.id;

  const friendLinks = await prisma.friend.findMany({
    where: { userId: userId },
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
