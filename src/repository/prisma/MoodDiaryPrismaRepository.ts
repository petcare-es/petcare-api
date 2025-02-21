import { prisma } from "../../lib/prisma"

import MoodDiaryRepository from "../interface/MoodDiaryRepository";
import MoodDiaryType from "../../types/MoodDiaryType";

export default class MoodDiaryPrismaRepository implements MoodDiaryRepository {
    public async create({mood, petId, date}: Omit<
        MoodDiaryType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<MoodDiaryType> {
        const moodDiary = await prisma.moodDiary.create({
            data: {
                mood,
                date,
                owner: {connect: { id: petId }}
            }
        });

        return moodDiary;
    }

    public async findByOwner(petId: string): Promise<MoodDiaryType[]> {
        return await prisma.moodDiary.findMany({
            where: { petId }
        });
    }
}
