/*
  Warnings:

  - The `closeDate` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `openDate` on the `Ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "openDate",
ADD COLUMN     "openDate" DATE NOT NULL,
DROP COLUMN "closeDate",
ADD COLUMN     "closeDate" DATE;
