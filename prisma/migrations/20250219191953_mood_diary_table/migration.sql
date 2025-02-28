-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('NERVOSO', 'FELIZ', 'CANSADO', 'ANCIOSO', 'CARINHOSO', 'TRISTE');

-- CreateTable
CREATE TABLE "moods" (
    "id" TEXT NOT NULL,
    "mood" "Mood" NOT NULL,
    "petId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "moods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "moods" ADD CONSTRAINT "moods_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
