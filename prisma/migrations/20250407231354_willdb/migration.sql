/*
  Warnings:

  - The values [ON] on the enum `BetType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BetType_new" AS ENUM ('FOR', 'AGAINST');
ALTER TABLE "Bet" ALTER COLUMN "betType" TYPE "BetType_new" USING ("betType"::text::"BetType_new");
ALTER TYPE "BetType" RENAME TO "BetType_old";
ALTER TYPE "BetType_new" RENAME TO "BetType";
DROP TYPE "BetType_old";
COMMIT;
