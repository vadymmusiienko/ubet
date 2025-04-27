import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = user!.id;

  const sent = await prisma.friendRequest.findMany({
    where: { senderId: userId },
    select: { receiverId: true },
  });
  const received = await prisma.friendRequest.findMany({
    where: { receiverId: userId },
    select: { senderId: true },
  });

  const excluded = [
    userId,
    ...sent.map((r) => r.receiverId),
    ...received.map((r) => r.senderId),
  ];

  const suggested = await prisma.user.findMany({
    where: { id: { notIn: excluded } },
    take: 5,
  });

  return NextResponse.json(suggested);
}
