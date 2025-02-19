import PetRepository from "repository/interface/PetRepository";
import VaccineRepository from "repository/interface/VaccineRepository";
import VaccineType from "types/VaccineType";
import ArgumentNotValidError from "./error/ArgumentNotValidError";

type VaccineCreateServiceRequest = {
    name: string;
    petId: string;
    location: string;
};

type VaccineCreateServiceResponse = {
    vaccine: VaccineType;
}

export default class VaccineService {

    private repository: VaccineRepository;
    private petRepository: PetRepository;

    public constructor(repository: VaccineRepository, petRepository: PetRepository) {
        this.repository = repository;
        this.petRepository = petRepository;
        
    }

    public async create(req: VaccineCreateServiceRequest): Promise<VaccineCreateServiceResponse> {
        const { name, petId, location} = req;

        const petFound = await this.petRepository.findById(petId);

        if (!petFound) {
            throw new ArgumentNotValidError("O pet não existe!");
        }

        const vaccine = await this.repository.create({
            name,
            petId,
            location
        });

        return { vaccine };
    }

}