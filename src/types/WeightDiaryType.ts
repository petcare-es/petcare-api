import BaseType from "./BaseType";

type WeightDiaryType = {
    weight: number;
    petId: string;
    date: Date;
} & BaseType;

export default WeightDiaryType;