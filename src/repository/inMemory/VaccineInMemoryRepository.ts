import VaccineRepository from "repository/interface/VaccineRepository";
import { randomBytes } from "crypto";
import VaccineType from "types/VaccineType";

export default class VaccineInMemoryRepository implements VaccineRepository {
    
    private vaccines: VaccineType[];
    
    public constructor() {
        this.vaccines = [];
    }

    public async findByOwner(petId: string): Promise<VaccineType[]> {
        const vaccinesFound = this.vaccines
            .filter(vaccine => vaccine.petId == petId);

        return vaccinesFound;
    }

    public async create(vaccineData: Omit<VaccineType, "id" | "createdAt" | "updatedAt">): Promise<VaccineType> {
        
        const { location, name, petId} = vaccineData;
        
        const vaccine: VaccineType = {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: randomBytes(12).toString("hex"),
            location,
            name,
            petId
        }

        this.vaccines.push(vaccine);

        return vaccine;

    }

}