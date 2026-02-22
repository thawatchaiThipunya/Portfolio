/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Contract` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Contract` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Education` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Hobby` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Hobby` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Main` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Main` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SoftSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SoftSkill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Technical` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Technical` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Education` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Hobby` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Main` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `SoftSkill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Technical` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `categoryId` on the `Technical` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Technical" DROP CONSTRAINT "Technical_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Education" DROP CONSTRAINT "Education_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Hobby" DROP CONSTRAINT "Hobby_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Main" DROP CONSTRAINT "Main_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "SoftSkill" DROP CONSTRAINT "SoftSkill_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Technical" DROP CONSTRAINT "Technical_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uID" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_id_key" ON "Contract"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Education_id_key" ON "Education"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Hobby_id_key" ON "Hobby"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Main_id_key" ON "Main"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SoftSkill_id_key" ON "SoftSkill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Technical_id_key" ON "Technical"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_uID_key" ON "User"("uID");

-- AddForeignKey
ALTER TABLE "Technical" ADD CONSTRAINT "Technical_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
