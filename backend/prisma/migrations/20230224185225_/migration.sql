/*
  Warnings:

  - You are about to drop the column `status` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "status",
ADD COLUMN     "open" BOOLEAN NOT NULL DEFAULT true;
