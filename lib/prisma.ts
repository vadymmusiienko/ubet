// Avoids an issue with having many clients at the same time by using a global client instance
// Whenever prisma is used, import prisma from this file and not PrismaClient (MUST BE USED SERVER SIDE)
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
