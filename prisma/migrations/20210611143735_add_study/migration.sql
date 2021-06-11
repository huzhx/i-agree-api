-- CreateTable
CREATE TABLE "Study" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "piNames" TEXT NOT NULL,
    "sponsor" TEXT NOT NULL,
    "institutionalReviewBoard" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "requiredDataElements" INTEGER NOT NULL,
    "institutionType" TEXT NOT NULL,
    "enrollmentDeadline" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
