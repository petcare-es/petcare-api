import VaccineType from "types/VaccineType";

export default interface VaccineRepository {
    create(userData: Omit<
        VaccineType, 
        "id" | 
        "createdAt" | 
        "updatedAt"
    >): Promise<VaccineType>;

    findByOwner(petId: string): Promise<VaccineType[]>;
}