import { prisma } from "../../lib/prisma"

import PetRepository from "../interface/PetRepository";
import PetType from "../../types/PetType";

export default class PetPrismaRepository implements PetRepository {
    public async create({ name, ownerId }: Omit<
        PetType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<PetType> {
        const pet = await prisma.pet.create({
            data: {
                name,
                owner: {connect: { id: ownerId }}
            }
        });

        return pet;
    }

    public async findById(id: string): Promise<PetType | null> {
        return await prisma.pet.findUnique({
            where: { id }
        });
    }

    public async findByOwner(ownerId: string): Promise<PetType[]> {
        return await prisma.pet.findMany({
            where: { ownerId }
        });
    }

}