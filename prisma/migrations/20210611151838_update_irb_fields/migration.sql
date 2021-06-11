/*
  Warnings:

  - You are about to drop the column `institutionalReviewBoard` on the `Study` table. All the data in the column will be lost.
  - Added the required column `irbApprovalDate` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `irbApprovedBy` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `irbContent` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Study" DROP COLUMN "institutionalReviewBoard",
ADD COLUMN     "irbApprovalDate" TEXT NOT NULL,
ADD COLUMN     "irbApprovedBy" TEXT NOT NULL,
ADD COLUMN     "irbContent" TEXT NOT NULL;
