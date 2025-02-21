import AppointmentRepository from "repository/interface/AppointmentRepository";
import AppointmentType from "types/AppointmentType";

import { randomBytes } from "crypto";

export default class AppointmentInMemoryRepository implements AppointmentRepository {
    
    private appointments: AppointmentType[];
    
    public constructor() {
        this.appointments = [];
    }

    public async findByOwner(petId: string): Promise<AppointmentType[]> {
        const appointmentsFound = this.appointments
            .filter(appointment => appointment.petId == petId);

        return appointmentsFound;
    }

    public async create(appointmentData: Omit<AppointmentType, "id" | "createdAt" | "updatedAt">): Promise<AppointmentType> {
        
        const { 
            location,
            name, 
            petId,
            scheduledDate,
            type
        } = appointmentData;
        
        const appointment: AppointmentType = {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: randomBytes(12).toString("hex"),
            location,
            name,
            petId,
            scheduledDate,
            type
        };

        this.appointments.push(appointment);

        return appointment;

    }

}