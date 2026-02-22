-- CreateEnum
CREATE TYPE "HobbyStatus" AS ENUM ('main', 'sub');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technical" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Technical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftSkill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SoftSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hobby" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT,
    "description" TEXT,
    "status" "HobbyStatus" NOT NULL DEFAULT 'sub',

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "gmail" TEXT,
    "facebook" TEXT,
    "line" TEXT,
    "instagram" TEXT,
    "x" TEXT,
    "linkedIn" TEXT,
    "github" TEXT,
    "address" TEXT,
    "phone" TEXT,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Main" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "image_url" TEXT,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Main_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "GPAX" TEXT,
    "faculty" TEXT,
    "starttime" TIMESTAMP(3) NOT NULL,
    "endtime" TIMESTAMP(3),

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Technical" ADD CONSTRAINT "Technical_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
