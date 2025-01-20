import { Request, Response } from "express";
import { idParamSchema, registerPetSchema } from "lib/zod";
import PetPrismaRepository from "repository/prisma/PetPrismaRepository";
import UserPrismaRepository from "repository/prisma/UserPrismaRepository";
import PetService from "service/PetService";

export default class PetController {
    public async register(req: Request, res: Response) {
        const { id: ownerId } = idParamSchema.parse(req.params);
        const { name } = registerPetSchema.parse(req.body);

        const createService = new PetService(
            new PetPrismaRepository(),
            new UserPrismaRepository()
        )

        const {pet} = await createService.create({
            name, 
            ownerId
        });

        res.status(201).json(pet);

    }

    public async index(req: Request, res: Response) {
        res.status(500).json({
            "message": "Rota não implementada"
        });
    }
}