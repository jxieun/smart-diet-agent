-- CreateEnum
CREATE TYPE "AnalysisStatus" AS ENUM ('PENDING', 'OCR_PROCESSING', 'ADVICE_GENERATING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "analysis_tasks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "status" "AnalysisStatus" NOT NULL DEFAULT 'PENDING',
    "result" JSONB,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analysis_tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "analysis_tasks" ADD CONSTRAINT "analysis_tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
