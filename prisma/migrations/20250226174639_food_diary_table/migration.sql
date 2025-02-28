-- CreateEnum
CREATE TYPE "MeasurementUnits" AS ENUM ('LITROS', 'MILILITROS', 'GRAMAS', 'KILOS');

-- CreateTable
CREATE TABLE "foods" (
    "id" TEXT NOT NULL,
    "amout" INTEGER NOT NULL,
    "unit" "MeasurementUnits" NOT NULL,
    "petId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
