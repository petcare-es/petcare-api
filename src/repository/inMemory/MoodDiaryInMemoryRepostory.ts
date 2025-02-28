import { randomBytes } from "crypto";
import MoodDiaryRepository from "repository/interface/MoodDiaryRepository";
import MoodDiaryType from "types/MoodDiaryType";

export default class MoodDiaryInMemoryRepository implements MoodDiaryRepository {
    
    private moodDiaries: MoodDiaryType[];
    
    public constructor() {
        this.moodDiaries = [];
    }

    public async findByOwner(petId: string): Promise<MoodDiaryType[]> {
        const moodsFound = this.moodDiaries
            .filter(mood => mood.petId == petId);

        return moodsFound;
    }

    public async create(moodDiaryData: Omit<MoodDiaryType, "id" | "createdAt" | "updatedAt">): Promise<MoodDiaryType> {
        
        const { mood, petId, date} = moodDiaryData;
        
        const moodDiary: MoodDiaryType = {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: randomBytes(12).toString("hex"),
            mood,
            date,
            petId
        }

        this.moodDiaries.push(moodDiary);

        return moodDiary;

    }

}