import AppointmentInMemoryRepository from '../../../repository/inMemory/AppointmentInMemoryRepository';
import PetInMemoryRepository from '../../../repository/inMemory/PetInMemoryRepository';
import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';

import AppointmentService from '../../../service/AppointmentService';
import UserService from '../../../service/UserService';
import PetService from '../../../service/PetService';

import ArgumentNotValidError from '../../../service/error/ArgumentNotValidError';

import { describe, it, expect, beforeEach} from 'vitest';

describe('List Vaccine Service', () => {
    let petRepository: PetInMemoryRepository;
    let appointmentRepository: AppointmentInMemoryRepository;
    let userRepository: UserInMemoryRepository;

    let petService: PetService;
    let appointmentService: AppointmentService;
    let userService: UserService;

    beforeEach(() => {
        petRepository = new PetInMemoryRepository();
        appointmentRepository = new AppointmentInMemoryRepository();
        userRepository = new UserInMemoryRepository();

        appointmentService = new AppointmentService(
            appointmentRepository,
            petRepository
        );

        petService = new PetService(
            petRepository, 
            userRepository
        );

        userService = new UserService(
            userRepository
        );


    });

    it('Shoulder return all appointment for a valid owner', async () => {

        const { user } = await userService.create({
                name:'Pedro',
                email:'pedr@gmail.com',
                password: '123456'
        });

        const { pet } = await petService.create({
            name: "Jublieu",
            ownerId: user.id
        });

        await appointmentService.create({
            name: "Consulta do Jublieu",
            location: "Shopping RioMar - R. Des. Lauro Nogueira, 1500 - Piso E2, Loja 20 - Papicu, Fortaleza - CE, 60175-055",
            petId: pet.id,
            scheduledDate: new Date(),
            type: "CONSULTA"
        });

        const {appointments} = await appointmentService.findByOwner({ownerId: pet.id});

        expect(appointments).toBeInstanceOf(Array);
        expect(appointments).toHaveLength(1);
        expect(appointments[0].name).toBe('Consulta do Jublieu');
    });

    it('should return an empty array if owner has no appointments', async () =>{

        const { user } = await userService.create({
            name:'Pedro',
            email:'pedr@gmail.com',
            password: '123456'
        });

        const { pet } = await petService.create({
            name: "Jublieu",
            ownerId: user.id
        });

        const {appointments} = await appointmentService.findByOwner({ownerId: pet.id});

        expect(appointments).instanceOf(Array);
        expect(appointments).toHaveLength(0);
    });

    it('should throw an erro if owner does not exist', async () =>{
        await expect(async () => {
            await appointmentService.findByOwner({ ownerId: 'id-non-existent' });
        }).rejects.toBeInstanceOf(ArgumentNotValidError);
    });
});