import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const CURRENT_USER_ID = "testid5";

export async function GET() {
  const requests = await prisma.friendRequest.findMany({
    where: { receiverId: CURRENT_USER_ID, status: "PENDING" },
    include: { sender: true },
  });

  return NextResponse.json(requests);
}
