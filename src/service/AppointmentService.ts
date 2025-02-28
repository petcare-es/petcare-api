import PetRepository from "repository/interface/PetRepository";
import ArgumentNotValidError from "./error/ArgumentNotValidError";
import AppointmentRepository from "repository/interface/AppointmentRepository";
import AppointmentType, { AppointmentTypes } from "types/AppointmentType";

type AppointmentCreateServiceRequest = {
    name: string;
    location: string;
    petId: string;
    type: AppointmentTypes;
    scheduledDate: Date;
};

type AppointmentCreateServiceResponse = {
    appointment: AppointmentType;
}


type FindAppointmentsByOwnerRequest = {
    ownerId: string;
}

type FindAppointmentsByOwnerResponse = {
    appointments: AppointmentType[];
}

export default class AppointmentService {

    private repository: AppointmentRepository;
    private petRepository: PetRepository;

    public constructor(repository: AppointmentRepository, petRepository: PetRepository) {
        this.repository = repository;
        this.petRepository = petRepository;
    }

    public async create(req: AppointmentCreateServiceRequest): Promise<AppointmentCreateServiceResponse> {
        const { 
            location,
            name,
            petId,
            scheduledDate,
            type
        } = req;

        const petFound = await this.petRepository.findById(petId);

        if (!petFound) {
            throw new ArgumentNotValidError("O pet não existe!");
        }

        const appointment = await this.repository.create({
            name,
            location,
            petId,
            scheduledDate,
            type
        });

        return { appointment };
    }

    public async findByOwner(req: FindAppointmentsByOwnerRequest): Promise<FindAppointmentsByOwnerResponse>{
        const {ownerId} = req;

        const petFound = await this.petRepository.findById(ownerId);

        if(!petFound){
            throw new ArgumentNotValidError("Pet não encontrado");
        }

        const appointments = await this.repository.findByOwner(ownerId);

        return { appointments };
    }
}
