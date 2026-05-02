/*
  Warnings:

  - You are about to drop the column `lastAlertSection` on the `budgets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "lastAlertSection",
ADD COLUMN     "lastAlertSent" TIMESTAMP(3);
