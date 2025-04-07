import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const senderId = "testid6";
  const body = await req.json();
  const { receiverId } = body;

  if (!senderId || !receiverId || senderId === receiverId) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const existing = await prisma.friendRequest.findUnique({
    where: {
      senderId_receiverId: {
        senderId,
        receiverId,
      },
    },
  });

  if (existing) {
    return NextResponse.json(
      { message: "Request already exists" },
      { status: 400 }
    );
  }

  const request = await prisma.friendRequest.create({
    data: {
      senderId,
      receiverId,
      status: "PENDING",
    },
  });

  return NextResponse.json({ message: "Request sent", request });
}
