import BaseType from "./BaseType";

export enum Mood {
    NERVOSO,
    FELIZ,
    CANSADO,
    ANCIOSO,
    CARINHOSO,
    TRISTE
}

type MoodDiaryType = {
    mood: Mood; 
    petId: string;
    date: Date;
} & BaseType;



export default MoodDiaryType;