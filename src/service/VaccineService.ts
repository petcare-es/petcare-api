import PetRepository from "repository/interface/PetRepository";
import VaccineRepository from "repository/interface/VaccineRepository"
import ArgumentNotValidError from "./error/ArgumentNotValidError";
import VaccineType from "types/VaccineType";

type FindOwnerByOwnerRequest = {
    petId: string;
};

type FindOwnerByOwnerResponse = {
    vaccines: VaccineType[]
};

export default class VaccineService {

    private repository: VaccineRepository;
    private petRepository: PetRepository;

    public constructor(
        repository: VaccineRepository,
        petRepository: PetRepository
    ) {
        this.repository = repository;
        this.petRepository = petRepository;
    }

    public async findByOwner(req: FindOwnerByOwnerRequest): Promise<FindOwnerByOwnerResponse>{
        const { petId } = req;

        const petFound = await this.petRepository.findById(petId);

        if(!petFound){
            throw new ArgumentNotValidError("Pet não encontrado");
        }

        const vaccines = await this.repository.findByOwner(petId);

        return { vaccines };
    }

}