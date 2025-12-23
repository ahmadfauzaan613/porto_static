/*
  Warnings:

  - You are about to drop the column `position` on the `users` table. All the data in the column will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "linkType" AS ENUM ('linkedin', 'whatsapp', 'email', 'resume');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "position",
ADD COLUMN     "role" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "profileLink" (
    "id" TEXT NOT NULL,
    "type" "linkType" NOT NULL,
    "url" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profileLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profileLink" ADD CONSTRAINT "profileLink_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
