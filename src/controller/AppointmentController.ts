import { Request, Response } from "express";

import AppointmentPrismaRepository from "repository/prisma/AppointmentPrismaRepository";
import PetPrismaRepository from "repository/prisma/PetPrismaRepository";

import AppointmentService from "service/AppointmentService";

import { idParamSchema, registerAppointmentSchema } from "lib/zod";

export default class AppointmentController {
    public async register(req: Request, res: Response) {
        const { id: petId } = idParamSchema.parse(req.params);
        const { 
            location,
            name,
            scheduledDate,
            type
         } = registerAppointmentSchema.parse(req.body);

        const createService = new AppointmentService(
            new AppointmentPrismaRepository(),
            new PetPrismaRepository()
        );

        const {appointment} = await createService.create({
            location,
            name,
            petId,
            scheduledDate,
            type
        });

        res.status(201).json(appointment);

    }

    public async findByOwner(req: Request, res: Response){
        const {id: ownerId} = idParamSchema.parse(req.params);

        const findPetService = new AppointmentService(
            new AppointmentPrismaRepository(),
            new PetPrismaRepository()
        );

        const { appointments } = await findPetService.findByOwner({
            ownerId
        });

        res.status(200).json(appointments);
    }
}