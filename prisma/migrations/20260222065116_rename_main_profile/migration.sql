/*
  Warnings:

  - You are about to drop the `Main` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Main";

-- CreateTable
CREATE TABLE "MainProfile" (
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "image_url" TEXT,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MainProfile_id_key" ON "MainProfile"("id");
