import { Request, Response } from "express";
import { idParamSchema, registerWeightDiarySchema } from "lib/zod";
import PetPrismaRepository from "repository/prisma/PetPrismaRepository";
import WeightDiaryPrismaRepository from "repository/prisma/WeightDiaryPrismaRepository";
import WeightDiaryService from "service/WeightDiaryService";


export default class WeightDiaryController {

    public async findByOwner(req: Request, res: Response){
        const {id: petId} = idParamSchema.parse(req.params);

        const weightDiaryService = new WeightDiaryService(
            new WeightDiaryPrismaRepository(),
            new PetPrismaRepository(),
        );

        const { weightDiaries } = await weightDiaryService.findByOwner({petId});

        res.status(200).json(weightDiaries);
    }

    public async register(req: Request, res: Response) {
        const { id: petId } = idParamSchema.parse(req.params);
        const { weight, date } = registerWeightDiarySchema.parse(req.body);
 

        const createService = new WeightDiaryService(
            new WeightDiaryPrismaRepository(),
            new PetPrismaRepository()
        )

        const { weightDiary } = await createService.create({
            weight, 
            petId,
            date
        });

        res.status(201).json(weightDiary);

    }
}