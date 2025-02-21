import { Request, Response } from "express";
import { idParamSchema, registerMoodDiarySchema } from "lib/zod";
import MoodDiaryPrismaRepository from "repository/prisma/MoodDiaryPrismaRepository";
import PetPrismaRepository from "repository/prisma/PetPrismaRepository";
import MoodDiaryService from "service/MoodDiaryService";

export default class MoodDiaryController {

    public async findByOwner(req: Request, res: Response){
        const {id: petId} = idParamSchema.parse(req.params);

        const moodDiaryService = new MoodDiaryService(
            new MoodDiaryPrismaRepository(),
            new PetPrismaRepository(),
        );

        const { moodDiaries } = await moodDiaryService.findByOwner({petId});

        res.status(200).json(moodDiaries);
    }

    public async register(req: Request, res: Response) {
        const { id: petId } = idParamSchema.parse(req.params);
        const { mood, date } = registerMoodDiarySchema.parse(req.body);
 

        const createService = new MoodDiaryService(
            new MoodDiaryPrismaRepository(),
            new PetPrismaRepository()
        )

        const { moodDiary } = await createService.create({
            mood, 
            petId,
            date
        });

        res.status(201).json(moodDiary);

    }
}