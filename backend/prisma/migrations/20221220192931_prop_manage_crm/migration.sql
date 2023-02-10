/*
  Warnings:

  - You are about to drop the column `managerId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_tenantId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "managerId",
DROP COLUMN "tenantId",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "password",
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "closeDate" DROP NOT NULL;

-- DropTable
DROP TABLE "Manager";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PropertyToTenant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToTenant_AB_unique" ON "_PropertyToTenant"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToTenant_B_index" ON "_PropertyToTenant"("B");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToTenant" ADD CONSTRAINT "_PropertyToTenant_A_fkey" FOREIGN KEY ("A") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToTenant" ADD CONSTRAINT "_PropertyToTenant_B_fkey" FOREIGN KEY ("B") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
