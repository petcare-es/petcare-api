import BaseType from "./BaseType";

export enum MeasurementUnits {
    LITROS     = "LITROS",
    MILILITROS = "MILILITROS",
    GRAMAS     = "GRAMAS",
    KILOS      = "KILOS"
}

type FoodDiaryType = {

    amout: number;
    unit: MeasurementUnits;
    petId: string;
    date: Date;

} & BaseType;

export default FoodDiaryType;