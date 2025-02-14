import { randomBytes } from "crypto";
import PetRepository from "repository/interface/PetRepository";
import PetType from "types/PetType";

export default class PetInMemoryRepository implements PetRepository {
    
    private pets: PetType[];
    
    public constructor() {
        this.pets = [];
    }

    public async findByOwner(ownerId: string): Promise<PetType[]> {
        return this.pets.filter(pet => pet.ownerId == ownerId);
    }

    public async create({ name, ownerId }: Omit<
        PetType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<PetType> {
        const user: PetType = {
            id: randomBytes(10).toString("hex"),
            name,
            ownerId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.pets.push(user);

        return user;
    }

}