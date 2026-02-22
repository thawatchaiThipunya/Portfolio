/*
  Warnings:

  - A unique constraint covering the columns `[sessionToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[loginToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('0', '1');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "loginExpires" TIMESTAMP(3),
ADD COLUMN     "loginToken" TEXT,
ADD COLUMN     "sessionToken" TEXT,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT '0';

-- CreateIndex
CREATE UNIQUE INDEX "User_sessionToken_key" ON "User"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_loginToken_key" ON "User"("loginToken");
