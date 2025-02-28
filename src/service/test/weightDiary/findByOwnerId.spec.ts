import PetInMemoryRepository from '../../../repository/inMemory/PetInMemoryRepository';
import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';
import WeightDiaryInMemoryRepository from '../../../repository/inMemory/WeightDiaryInMemoryRepository';

import UserService from '../../../service/UserService';
import PetService from '../../../service/PetService';
import WeightDiaryService from '../../../service/WeightDiaryService';

import ArgumentNotValidError from '../../../service/error/ArgumentNotValidError';
import { describe, it, expect, beforeEach } from 'vitest';

describe('List WeightDiaries Service', () => {
    let petRepository: PetInMemoryRepository;
    let weightDiaryRepository: WeightDiaryInMemoryRepository;
    let userRepository: UserInMemoryRepository;

    let petService: PetService;
    let weightDiaryService: WeightDiaryService;
    let userService: UserService;

    beforeEach(() => {
        petRepository = new PetInMemoryRepository();
        weightDiaryRepository = new WeightDiaryInMemoryRepository();
        userRepository = new UserInMemoryRepository();

        weightDiaryService = new WeightDiaryService(
            weightDiaryRepository,
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

    it('should return all weightDiaries for a valid pet owner', async () => {
        const { user } = await userService.create({
            name: 'Pedro',
            email: 'pedr@gmail.com',
            password: '123456'
        });

        const { pet } = await petService.create({
            name: 'Jublieu',
            ownerId: user.id
        });

        await weightDiaryService.create({
            petId: pet.id,
            weight: 12.5,
            date: new Date('2025-02-20')
        });

        const { weightDiaries } = await weightDiaryService.findByOwner({ petId: pet.id });

        expect(weightDiaries).toBeInstanceOf(Array);
        expect(weightDiaries).toHaveLength(1);
        expect(weightDiaries[0].weight).toBe(12.5);
    });

    it('should return an empty array if pet has no weightDiaries', async () => {
        const { user } = await userService.create({
            name: 'Pedro',
            email: 'pedr@gmail.com',
            password: '123456'
        });

        const { pet } = await petService.create({
            name: 'Jublieu',
            ownerId: user.id
        });

        const { weightDiaries } = await weightDiaryService.findByOwner({ petId: pet.id });

        expect(weightDiaries).toBeInstanceOf(Array);
        expect(weightDiaries).toHaveLength(0);
    });

    it('should throw an error if pet does not exist', async () => {
        await expect(async () => {
            await weightDiaryService.findByOwner({ petId: 'id-non-existent' });
        }).rejects.toBeInstanceOf(ArgumentNotValidError);
    });
});
