/*
  Warnings:

  - You are about to drop the column `status` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `accountabilityPartnerid` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `target` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the `AccountabilityPartner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserAccountabilityPartners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `goalProgress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `betType` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stakes` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "BetType" AS ENUM ('ON', 'AGAINST');

-- DropForeignKey
ALTER TABLE "AccountabilityPartner" DROP CONSTRAINT "AccountabilityPartner_goalId_fkey";

-- DropForeignKey
ALTER TABLE "AccountabilityPartner" DROP CONSTRAINT "AccountabilityPartner_userId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_accountabilityPartnerid_fkey";

-- DropForeignKey
ALTER TABLE "_UserAccountabilityPartners" DROP CONSTRAINT "_UserAccountabilityPartners_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserAccountabilityPartners" DROP CONSTRAINT "_UserAccountabilityPartners_B_fkey";

-- DropForeignKey
ALTER TABLE "goalProgress" DROP CONSTRAINT "goalProgress_goalId_fkey";

-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "status",
ADD COLUMN     "betType" "BetType" NOT NULL;

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "accountabilityPartnerid",
DROP COLUMN "target",
ADD COLUMN     "accountabilityPartnerId" TEXT,
ADD COLUMN     "stakes" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "GoalStatus" NOT NULL DEFAULT 'NOT_STARTED',
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "AccountabilityPartner";

-- DropTable
DROP TABLE "_UserAccountabilityPartners";

-- DropTable
DROP TABLE "goalProgress";

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_accountabilityPartnerId_fkey" FOREIGN KEY ("accountabilityPartnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
