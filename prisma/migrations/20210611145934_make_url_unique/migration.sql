/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Study` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Study.url_unique" ON "Study"("url");
