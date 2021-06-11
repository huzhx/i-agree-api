/*
  Warnings:

  - Added the required column `institutionName` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "institutionName" TEXT NOT NULL;
