import PetRepository from "repository/interface/PetRepository";
import ArgumentNotValidError from "./error/ArgumentNotValidError";
import WeightDiaryType from "types/WeightDiaryType";
import WeightDiaryRepository from "repository/interface/WeightDiaryRepository";

type FindWeightDiaryByOwnerRequest = {
    petId: string;
};

type FindWeightDiaryOwnerResponse = {
    weightDiaries: WeightDiaryType[]
};

type WeightDiaryCreateServiceRequest = {
    weight: number;
    petId: string;
    date: Date;
};

type WeightDiaryCreateServiceResponse = {
    weightDiary: WeightDiaryType;
}

export default class WeightDiaryService {

    private repository: WeightDiaryRepository;
    private petRepository: PetRepository;

    public constructor(
        repository: WeightDiaryRepository,
        petRepository: PetRepository
    ) {
        this.repository = repository;
        this.petRepository = petRepository;
    }

    public async findByOwner(req: FindWeightDiaryByOwnerRequest): Promise<FindWeightDiaryOwnerResponse>{
        const { petId } = req;

        const petFound = await this.petRepository.findById(petId);

        if(!petFound){
            throw new ArgumentNotValidError("Pet não encontrado");
        }

        const weightDiaries = await this.repository.findByOwner(petId);

        return { weightDiaries };
    }

    public async create(req: WeightDiaryCreateServiceRequest): Promise<WeightDiaryCreateServiceResponse> {
        const { petId, weight, date} = req;

        const petFound = await this.petRepository.findById(petId);

        if (!petFound) {
            throw new ArgumentNotValidError("O pet não existe!");
        }

        if(isNaN(date.getTime())){
            throw new ArgumentNotValidError("A data é invalida");
        }
        const weightDiary = await this.repository.create({
            petId,
            weight,
            date
        });

        return { weightDiary };
    }

}