import BaseType from "./BaseType";
import { MeasurementUnits } from "@prisma/client";

type FoodDiaryType = {

    amout: number;
    unit: MeasurementUnits;
    petId: string;
    date: Date;

} & BaseType;

export default FoodDiaryType;