-- CreateTable
CREATE TABLE "DataElementPreference" (
    "id" SERIAL NOT NULL,
    "institutionType" TEXT NOT NULL,
    "consentState" INTEGER NOT NULL DEFAULT -1,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DataElementPreference" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
