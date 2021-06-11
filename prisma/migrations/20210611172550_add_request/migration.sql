-- CreateTable
CREATE TABLE "Request" (
    "userId" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "consentState" INTEGER NOT NULL DEFAULT -1,

    PRIMARY KEY ("userId","studyId")
);

-- CreateTable
CREATE TABLE "DeclineReason" (
    "id" SERIAL NOT NULL,
    "dataElement" TEXT NOT NULL,
    "declineReason" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeclineReason" ADD FOREIGN KEY ("userId", "studyId") REFERENCES "Request"("userId", "studyId") ON DELETE CASCADE ON UPDATE CASCADE;
