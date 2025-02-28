import VaccineInMemoryRepository from '../../../repository/inMemory/VaccineInMemoryRepository';
import PetInMemoryRepository from '../../../repository/inMemory/PetInMemoryRepository';
import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';

import VaccineService from '../../../service/VaccineService';
import UserService from '../../../service/UserService';
import PetService from '../../../service/PetService';

import ArgumentNotValidError from '../../../service/error/ArgumentNotValidError';

import { describe, it, expect, beforeEach} from 'vitest';

describe('List Vaccine Service', () => {
    let petRepository: PetInMemoryRepository;
    let vaccineRepository: VaccineInMemoryRepository;
    let userRepository: UserInMemoryRepository;

    let petService: PetService;
    let vaccineService: VaccineService;
    let userService: UserService;

    beforeEach(() => {
        petRepository = new PetInMemoryRepository();
        vaccineRepository = new VaccineInMemoryRepository();
        userRepository = new UserInMemoryRepository();

        vaccineService = new VaccineService(
            vaccineRepository,
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

    it('Shoulder return all vaccine for a valid owner', async () => {

        const { user } = await userService.create({
                name:'Pedro',
                email:'pedr@gmail.com',
                password: '123456'
        });

        const { pet } = await petService.create({
            name: "Jublieu",
            ownerId: user.id
        });

        await vaccineService.create({
            name: "Gripe Canina",
            location: "Shopping RioMar - R. Des. Lauro Nogueira, 1500 - Piso E2, Loja 20 - Papicu, Fortaleza - CE, 60175-055",
            petId: pet.id
        });

        const {vaccines} = await vaccineService.findByOwner({petId: pet.id});

        expect(vaccines).toBeInstanceOf(Array);
        expect(vaccines).toHaveLength(1);
        expect(vaccines[0].name).toBe('Gripe Canina');
    });

    it('should return an empty array if owner has no vaccines', async () =>{

        const { user } = await userService.create({
            name:'Pedro',
            email:'pedr@gmail.com',
            password: '123456'
        });

        const { pet } = await petService.create({
            name: "Jublieu",
            ownerId: user.id
        });

        const {vaccines} = await vaccineService.findByOwner({petId: pet.id});

        expect(vaccines).instanceOf(Array);
        expect(vaccines).toHaveLength(0);
    });

    it('should throw an erro if owner does not exist', async () =>{
        await expect(async () => {
            await vaccineService.findByOwner({ petId: 'id-non-existent' });
        }).rejects.toBeInstanceOf(ArgumentNotValidError);
    });
});