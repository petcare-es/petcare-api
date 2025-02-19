import { Request, Response } from "express";
import { idParamSchema } from "lib/zod";
import PetPrismaRepository from "repository/prisma/PetPrismaRepository";
import VaccinePrismaRepository from "repository/prisma/VaccinePrismaRepository";
import VaccineService from "service/VaccineService";

export default class VaccineController {

    public async findByOwner(req: Request, res: Response){
        const {id: petId} = idParamSchema.parse(req.params);

        const findPetService = new VaccineService(
            new VaccinePrismaRepository(),
            new PetPrismaRepository(),
        );

        const { vaccines } = await findPetService.findByOwner({petId});

        res.status(200).json(vaccines);
    }

}