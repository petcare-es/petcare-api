import PetRepository from "repository/interface/PetRepository";
import UserRepository from "repository/interface/UserRepository";
import PetType from "types/PetType";
import ArgumentNotValidError from "./error/ArgumentNotValidError";

type PetCreateServiceRequest = {
    name: string;
    ownerId: string;
};

type PetCreateServiceResponse = {
    pet: PetType;
}

type FindPetsByOwnerRequest = {
    ownerId: string;
}

type FindPetsByOwnerResponse = {
    pets: PetType[];
}

export default class PetService {

    private repository: PetRepository
    private userRepository: UserRepository;

    public constructor(repository: PetRepository, userRepository: UserRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public async create(req: PetCreateServiceRequest): Promise<PetCreateServiceResponse> {
        const { name, ownerId } = req;

        const userFound = await this.userRepository.findById(ownerId);

        if (!userFound) {
            throw new ArgumentNotValidError("O usuário não existe!");
        }

        const pet = await this.repository.create({
            name,
            ownerId
        });

        return { pet };
    }

    public async findByOwner(req: FindPetsByOwnerRequest): Promise<FindPetsByOwnerResponse>{
        const {ownerId} = req;

        if(!await this.userRepository.findById(ownerId)){
            throw new ArgumentNotValidError()
        }

        const pets = await this.repository.findByOwner(ownerId);

        return { pets };
    }
}
