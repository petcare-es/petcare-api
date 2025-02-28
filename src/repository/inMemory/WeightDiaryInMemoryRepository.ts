import { randomBytes } from "crypto";
import WeightDiaryRepository from "repository/interface/WeightDiaryRepository";
import WeightDiaryType from "types/WeightDiaryType";

export default class WeightDiaryInMemoryRepository implements WeightDiaryRepository {
    
    private weightDiaries: WeightDiaryType[];
    
    public constructor() {
        this.weightDiaries = [];
    }

    public async findByOwner(petId: string): Promise<WeightDiaryType[]> {
        const weightsFound = this.weightDiaries
            .filter(weight => weight.petId == petId);

        return weightsFound;
    }

    public async create(weightDiaryData: Omit<WeightDiaryType, "id" | "createdAt" | "updatedAt">): Promise<WeightDiaryType> {
        
        const { weight, petId, date} = weightDiaryData;
        
        const weightDiary: WeightDiaryType = {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: randomBytes(12).toString("hex"),
            weight,
            date,
            petId
        }

        this.weightDiaries.push(weightDiary);

        return weightDiary;

    }

}
