/*
  Warnings:

  - You are about to drop the column `loginExpires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetExpires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_sessionToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "loginExpires",
DROP COLUMN "resetExpires",
DROP COLUMN "sessionToken",
ADD COLUMN     "loginExpire" TIMESTAMP(3),
ADD COLUMN     "resetExpire" TIMESTAMP(3);
