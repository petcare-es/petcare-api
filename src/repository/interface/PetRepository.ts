import PetType from "types/PetType";

export default interface PetRepository {
    create(userData: Omit<
        PetType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<PetType>;

    findByOwner(ownerId: string): Promise<PetType[]>;
}