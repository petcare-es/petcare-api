import BaseType from "./BaseType";

export enum AppointmentTypes {
    VACINA   = 'VACINA',
    CONSULTA = 'CONSULTA',
    REMEDIO  = 'REMEDIO'
}

type AppointmentType = {
    name: string;
    location: string;
    petId: string;
    type: AppointmentTypes;
    scheduledDate: Date;
} & BaseType;

export default AppointmentType;