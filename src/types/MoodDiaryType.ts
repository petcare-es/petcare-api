import BaseType from "./BaseType";

type MoodDiaryType = {
    petId: string;
    content: string; 
    date: Date;
} & BaseType;

export default MoodDiaryType;