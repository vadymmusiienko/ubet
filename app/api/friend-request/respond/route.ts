import { PrismaClient, RequestStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { requestId, action } = body;

  if (!requestId || !["ACCEPTED", "DECLINED"].includes(action)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const request = await prisma.friendRequest.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  if (request.status !== "PENDING") {
    return NextResponse.json(
      { error: "Request already responded to" },
      { status: 400 }
    );
  }

  await prisma.friendRequest.update({
    where: { id: requestId },
    data: { status: action as RequestStatus },
  });

  if (action === "ACCEPTED") {
    await prisma.friend.createMany({
      data: [
        { userId: request.senderId, friendId: request.receiverId },
        { userId: request.receiverId, friendId: request.senderId },
      ],
      skipDuplicates: true,
    });
  }

  return NextResponse.json({ message: `Request ${action.toLowerCase()}` });
}
