import BaseType from "./BaseType";

export enum MeasurementUnits {
    LITROS,
    MILILITROS,
    GRAMAS,
    KILOS
}

type FoodDiaryType = {

    amout: number;
    unit: MeasurementUnits;
    petId: string;
    date: Date;

} & BaseType;

export default FoodDiaryType;