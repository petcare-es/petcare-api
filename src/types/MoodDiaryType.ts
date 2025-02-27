import BaseType from "./BaseType";

export enum Mood {
    NERVOSO   = "NERVOSO",
    FELIZ     = "FELIZ",
    CANSADO   = "CANSADO",
    ANCIOSO   = "ANCIOSO",
    CARINHOSO = "CARINHOSO",
    TRISTE    = "TRISTE"
}

type MoodDiaryType = {
    mood: Mood; 
    petId: string;
    date: Date;
} & BaseType;



export default MoodDiaryType;