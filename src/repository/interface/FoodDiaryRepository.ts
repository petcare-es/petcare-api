import FoodDiaryType from "types/FoodDiaryType";

export default interface FoodDiaryRepository {
    create(userData: Omit<
        FoodDiaryType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<FoodDiaryType>;

    findByOwner(petId: string): Promise<FoodDiaryType[]>;
}