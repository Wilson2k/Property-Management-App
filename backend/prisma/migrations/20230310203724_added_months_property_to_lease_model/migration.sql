/*
  Warnings:

  - You are about to drop the column `totalValue` on the `Lease` table. All the data in the column will be lost.
  - Added the required column `months` to the `Lease` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lease" DROP COLUMN "totalValue",
ADD COLUMN     "months" INTEGER NOT NULL;
