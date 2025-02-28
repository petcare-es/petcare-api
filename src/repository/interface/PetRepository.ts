import PetType from "types/PetType";

export default interface PetRepository {
    create(userData: Omit<
        PetType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<PetType>;

    findById(id: string): Promise<PetType | null>;

    findByOwner(ownerId: string): Promise<PetType[]>;
}