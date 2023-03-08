/*
  Warnings:

  - A unique constraint covering the columns `[address,city,state]` on the table `Property` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Property_address_key";

-- CreateIndex
CREATE UNIQUE INDEX "Property_address_city_state_key" ON "Property"("address", "city", "state");
