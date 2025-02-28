import { Request, Response } from "express";
import { registerPetSchema } from "lib/zod";
import PetPrismaRepository from "repository/prisma/PetPrismaRepository";
import UserPrismaRepository from "repository/prisma/UserPrismaRepository";
import PetService from "service/PetService";

export default class PetController {
    public async register(req: Request, res: Response) {
        const ownerId = req.user.id;
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

    public async findByOwner(req: Request, res: Response){
        const ownerId = req.user.id;

        const findPetService = new PetService(
            new PetPrismaRepository(),
            new UserPrismaRepository(),
        );

        const { pets } = await findPetService.findByOwner({ownerId});

        res.status(200).json(pets);
    }
}