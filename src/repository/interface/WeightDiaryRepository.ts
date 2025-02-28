import WeightDiaryType from "types/WeightDiaryType";

export default interface MoodDiaryRepository {
    create(userData: Omit<
        WeightDiaryType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<WeightDiaryType>;

    findByOwner(petId: string): Promise<WeightDiaryType[]>;
}