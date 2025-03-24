import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { senderId, receiverId } = body;

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
