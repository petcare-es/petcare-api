import PetRepository from "repository/interface/PetRepository";
import FoodDiaryRepository from "repository/interface/FoodDiaryRepository"
import ArgumentNotValidError from "./error/ArgumentNotValidError";
import FoodDiaryType, { MeasurementUnits } from "types/FoodDiaryType";

type FindFoodDiaryByOwnerRequest = {
    petId: string;
};

type FindFoodDiaryOwnerResponse = {
    foodDiaries: FoodDiaryType[]
};

type FoodDiaryCreateServiceRequest = {
    amout: number;
    unit: MeasurementUnits;
    petId: string;
    date: Date;
};

type FoodDiaryCreateServiceResponse = {
    foodDiary: FoodDiaryType;
}

export default class FoodDiaryService {

    private repository: FoodDiaryRepository;
    private petRepository: PetRepository;

    public constructor(
        repository: FoodDiaryRepository,
        petRepository: PetRepository
    ) {
        this.repository = repository;
        this.petRepository = petRepository;
    }

    public async findByOwner(req: FindFoodDiaryByOwnerRequest): Promise<FindFoodDiaryOwnerResponse>{
        const { petId } = req;

        const petFound = await this.petRepository.findById(petId);

        if(!petFound){
            throw new ArgumentNotValidError("Pet não encontrado");
        }

        const foodDiaries = await this.repository.findByOwner(petId);

        return { foodDiaries };
    }

    public async create(req: FoodDiaryCreateServiceRequest): Promise<FoodDiaryCreateServiceResponse> {
        const { petId, amout, unit, date } = req;

        const petFound = await this.petRepository.findById(petId);

        if (!petFound) {
            throw new ArgumentNotValidError("O pet não existe!");
        }

        const foodDiary = await this.repository.create({
            unit,
            amout,
            petId,
            date
        });

        return { foodDiary };
    }

}