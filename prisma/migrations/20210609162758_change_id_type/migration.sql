/*
  Warnings:

  - The primary key for the `DataElementPreference` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DataElementPreference" DROP CONSTRAINT "DataElementPreference_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "DataElementPreference_id_seq";
