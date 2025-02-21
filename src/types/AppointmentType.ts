import BaseType from "./BaseType";
import { AppointmentTypes } from "@prisma/client";


type AppointmentType = {
    name: string;
    location: string;
    petId: string;
    type: AppointmentTypes;
    scheduledDate: Date;
} & BaseType;

export default AppointmentType;