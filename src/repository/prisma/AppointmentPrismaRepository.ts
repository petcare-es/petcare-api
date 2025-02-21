import { prisma } from "../../lib/prisma"

import AppointmentRepository from "../interface/AppointmentRepository";
import AppointmentType from "../../types/AppointmentType";

export default class AppointmentPrismaRepository implements AppointmentRepository {
    public async create({ name, location, petId, scheduledDate, type }: Omit<
        AppointmentType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<AppointmentType> {

        const appointment = await prisma.appointment.create({
            data: {
                location,
                name,
                scheduledDate,
                type,
                owner: {connect: { id: petId }}                
            }
        });

        return appointment;
    }

    public async findByOwner(petId: string): Promise<AppointmentType[]> {
        return await prisma.appointment.findMany({
            where: { petId }
        });
    }

}