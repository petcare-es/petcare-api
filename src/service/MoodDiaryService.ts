import PetRepository from "repository/interface/PetRepository";
import MoodDiaryRepository from "repository/interface/MoodDiaryRepository"
import ArgumentNotValidError from "./error/ArgumentNotValidError";
import MoodDiaryType, { Mood } from "types/MoodDiaryType";

type FindMoodDiaryByOwnerRequest = {
    petId: string;
};

type FindMoodDiaryOwnerResponse = {
    moodDiaries: MoodDiaryType[]
};

type MoodDiaryCreateServiceRequest = {
    mood: Mood;
    petId: string;
    date: Date;
};

type MoodDiaryCreateServiceResponse = {
    moodDiary: MoodDiaryType;
}

export default class MoodDiaryService {

    private repository: MoodDiaryRepository;
    private petRepository: PetRepository;

    public constructor(
        repository: MoodDiaryRepository,
        petRepository: PetRepository
    ) {
        this.repository = repository;
        this.petRepository = petRepository;
    }

    public async findByOwner(req: FindMoodDiaryByOwnerRequest): Promise<FindMoodDiaryOwnerResponse>{
        const { petId } = req;

        const petFound = await this.petRepository.findById(petId);

        if(!petFound){
            throw new ArgumentNotValidError("Pet não encontrado");
        }

        const moodDiaries = await this.repository.findByOwner(petId);

        return { moodDiaries };
    }

    public async create(req: MoodDiaryCreateServiceRequest): Promise<MoodDiaryCreateServiceResponse> {
        const { petId, mood, date} = req;

        const petFound = await this.petRepository.findById(petId);

        if (!petFound) {
            throw new ArgumentNotValidError("O pet não existe!");
        }

        if(isNaN(date.getTime())){
            throw new ArgumentNotValidError("A data é invalida");
        }
        const moodDiary = await this.repository.create({
            petId,
            mood,
            date
        });

        return { moodDiary };
    }

}