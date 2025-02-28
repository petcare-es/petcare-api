import { prisma } from "../../lib/prisma"

import FoodDiaryRepository from "../interface/FoodDiaryRepository";
import FoodDiaryType from "../../types/FoodDiaryType";

export default class FoodDiaryPrismaRepository implements FoodDiaryRepository {
    public async create({ amout, date, petId, unit }: Omit<
        FoodDiaryType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<FoodDiaryType> {
        const foodDiary = await prisma.foodDiary.create({
            data: {
                amout,
                date,
                unit,
                owner: { connect: { id: petId }}
            }
        });

        return foodDiary;
    }

    public async findByOwner(petId: string): Promise<FoodDiaryType[]> {
        return await prisma.foodDiary.findMany({
            where: { petId }
        });
    }
}
