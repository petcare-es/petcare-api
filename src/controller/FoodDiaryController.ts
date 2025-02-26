import { Request, Response } from "express";
import { idParamSchema, registerFoodDiarySchema } from "lib/zod";
import FoodDiaryPrismaRepository from "repository/prisma/FoodDiaryPrismaRepository";
import PetPrismaRepository from "repository/prisma/PetPrismaRepository";
import FoodDiaryService from "service/FoodDiaryService";

export default class FoodDiaryController {

    public async findByOwner(req: Request, res: Response){
        const {id: petId} = idParamSchema.parse(req.params);

        const foodDiaryService = new FoodDiaryService(
            new FoodDiaryPrismaRepository(),
            new PetPrismaRepository(),
        );

        const { foodDiaries } = await foodDiaryService.findByOwner({petId});

        res.status(200).json(foodDiaries);
    }

    public async register(req: Request, res: Response) {
        const { id: petId } = idParamSchema.parse(req.params);
        const { 
            amout,
            date,
            unit
         } = registerFoodDiarySchema.parse(req.body);
 

        const createService = new FoodDiaryService(
            new FoodDiaryPrismaRepository(),
            new PetPrismaRepository()
        )

        const { foodDiary } = await createService.create({
            amout,
            date,
            unit,
            petId
        });

        res.status(201).json(foodDiary);

    }
}