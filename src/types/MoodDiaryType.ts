import BaseType from "./BaseType";
import { Mood } from "@prisma/client";

type MoodDiaryType = {
    mood: Mood; 
    petId: string;
    date: Date;
} & BaseType;

export default MoodDiaryType;