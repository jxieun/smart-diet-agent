/*
  Warnings:

  - You are about to drop the `Meal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_userId_fkey";

-- DropTable
DROP TABLE "Meal";

-- CreateTable
CREATE TABLE "meals" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mealType" "MealType" NOT NULL DEFAULT 'BREAKFAST',
    "calories" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "mealDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "meals_userId_idx" ON "meals"("userId");

-- CreateIndex
CREATE INDEX "meals_mealDate_idx" ON "meals"("mealDate");

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
