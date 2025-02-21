import { prisma } from "../../lib/prisma"

import VaccineRepository from "../interface/VaccineRepository";
import VaccineType from "../../types/VaccineType";

export default class VaccinePrismaRepository implements VaccineRepository {
    public async create({ name, petId, location }: Omit<
        VaccineType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<VaccineType> {
        const vaccine = await prisma.vaccine.create({
            data: {
                name,
                location,
                owner: {connect: { id: petId }}
            }
        });

        return vaccine;
    }

    public async findByOwner(petId: string): Promise<VaccineType[]> {
        return await prisma.vaccine.findMany({
            where: { petId }
        });
    }

}