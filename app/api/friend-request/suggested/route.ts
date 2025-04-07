import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const CURRENT_USER_ID = "testid6";

  const sent = await prisma.friendRequest.findMany({
    where: { senderId: CURRENT_USER_ID },
    select: { receiverId: true },
  });
  const received = await prisma.friendRequest.findMany({
    where: { receiverId: CURRENT_USER_ID },
    select: { senderId: true },
  });

  const excluded = [
    CURRENT_USER_ID,
    ...sent.map((r) => r.receiverId),
    ...received.map((r) => r.senderId),
  ];

  const suggested = await prisma.user.findMany({
    where: { id: { notIn: excluded } },
    take: 5,
  });

  return NextResponse.json(suggested);
}
