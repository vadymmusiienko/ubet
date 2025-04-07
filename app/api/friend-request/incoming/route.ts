import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const CURRENT_USER_ID = "testid6";

  const requests = await prisma.friendRequest.findMany({
    where: { receiverId: CURRENT_USER_ID, status: "PENDING" },
    include: { sender: true },
  });

  return NextResponse.json(requests);
}
