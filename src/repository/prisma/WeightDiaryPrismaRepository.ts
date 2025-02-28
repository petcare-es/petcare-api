import { prisma } from "../../lib/prisma"

import WeightDiaryRepository from "../interface/WeightDiaryRepository";
import WeightDiaryType from "../../types/WeightDiaryType";

export default class MoodDiaryPrismaRepository implements WeightDiaryRepository {
    public async create({weight, petId, date}: Omit<
        WeightDiaryType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<WeightDiaryType> {
        const weightDiary = await prisma.weightDiary.create({
            data: {
                weight,
                date,
                owner: {connect: { id: petId }}
            }
        });

        return weightDiary;
    }

    public async findByOwner(petId: string): Promise<WeightDiaryType[]> {
        return await prisma.weightDiary.findMany({
            where: { petId }
        });
    }
}
