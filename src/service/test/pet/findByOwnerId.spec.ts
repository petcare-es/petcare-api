import PetInMemoryRepository from '../../../repository/inMemory/PetInMemoryRepository';
import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';

import PetService from '../../../service/PetService';
import UserService from '../../../service/UserService';

import ArgumentNotValidError from '../../../service/error/ArgumentNotValidError';

import { describe, it, expect, beforeEach} from 'vitest';

describe('List Pets Service', () => {
    let petRepository: PetInMemoryRepository;
    let userRepository: UserInMemoryRepository;

    let petService: PetService;
    let userService: UserService;

    beforeEach(() => {
        petRepository = new PetInMemoryRepository();
        userRepository = new UserInMemoryRepository();

        userService = new UserService(userRepository);
        petService = new PetService(petRepository, userRepository);


    });

    it('Shoulder return all pets for a valid owner', async () => {

        const {user} = await userService.create({
                name:'Pedro',
                email:'pedr@gmail.com',
                password: '123456'
        });

        await petService.create({name: 'Jubileu', ownerId: user.id});
        await petService.create({name: 'Rex', ownerId: user.id});

        const petList = await petService.findByOwner({ownerId: user.id});

        expect(petList.pets).toBeInstanceOf(Array);
        expect(petList.pets).toHaveLength(2);
        expect(petList.pets[0].name).toBe('Jubileu');
        expect(petList.pets[1].name).toBe('Rex');
    });

    it('should return an empty array if owner has no pets', async () =>{

        const {user} = await userService.create({
            name: 'Maria',
            email: 'mariaa@gmail.com',
            password: '123456'
        });

        const petList = await petService.findByOwner({ownerId: user.id})

        expect(petList.pets).instanceOf(Array);
        expect(petList.pets).toHaveLength(0);
    });

    it('should throw an erro if owner does not exist', async () =>{
        await expect(async () => {
            await petService.findByOwner({ownerId: 'id-non-existent'})
        }).rejects.toBeInstanceOf(ArgumentNotValidError);
    });
});