import MoodDiaryType from "types/MoodDiaryType";

export default interface MoodDiaryRepository {
    create(userData: Omit<
        MoodDiaryType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<MoodDiaryType>;

    findByOwner(petId: string): Promise<MoodDiaryType[]>;
}