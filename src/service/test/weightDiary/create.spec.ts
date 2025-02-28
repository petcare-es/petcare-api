import PetInMemoryRepository from '../../../repository/inMemory/PetInMemoryRepository';
import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';
import PetService from '../../PetService';
import UserService from '../../UserService';
import ArgumentNotValidError from '../../error/ArgumentNotValidError';
import { describe, it, expect, beforeEach } from 'vitest';
import WeightDiaryInMemoryRepository from '../../../repository/inMemory/WeightDiaryInMemoryRepository';
import WeightDiaryService from '../../WeightDiaryService';

describe('WeightDiary Service', () => {
    let weightDiaryRepository: WeightDiaryInMemoryRepository;
    let petRepository: PetInMemoryRepository; 
    let userRepository: UserInMemoryRepository;

    let weightDiaryService: WeightDiaryService;
    let petService: PetService;
    let userService: UserService;
  
    beforeEach(() => {
        weightDiaryRepository = new WeightDiaryInMemoryRepository();
        petRepository = new PetInMemoryRepository();
        userRepository = new UserInMemoryRepository();

        weightDiaryService = new WeightDiaryService(weightDiaryRepository, petRepository);
        petService = new PetService(petRepository, userRepository);
        userService = new UserService(userRepository);
    });

    it('should be able to register a new weightDiary', async () => {
        const { user } = await userService.create({
            email: 'pedro@gmail.com',
            name: 'Pedro',
            password: '123456',
        });

        const { pet } = await petService.create({
            name: 'Luna',
            ownerId: user.id
        });

        const { weightDiary } = await weightDiaryService.create({
            weight: 5.2,
            petId: pet.id,
            date: new Date("2025-02-20"),
        });

        expect(weightDiary.weight).toBe(5.2);
        expect(weightDiary.date).toBeInstanceOf(Date);
    });

    it('should not be able to register a new weightDiary with a non-existent pet', async () => {
        await expect(async () => {
            await weightDiaryService.create({
                weight: 6.0,
                petId: "id-non-existent",
                date: new Date()
            });
        }).rejects.toBeInstanceOf(ArgumentNotValidError);
    });

    it('should not create a weight diary with a negative weight', async () => {
        const { user } = await userService.create({
            email: 'pedro@gmail.com',
            name: 'Pedro',
            password: '123456',
        });

        const { pet } = await petService.create({
            name: 'Luna',
            ownerId: user.id
        });

        await expect(weightDiaryService.create({
            petId: pet.id,
            weight: -3.5,
            date: new Date()
        })).rejects.toBeInstanceOf(ArgumentNotValidError);
    });

    it('should not create a weight diary with an invalid date', async () => {
        const { user } = await userService.create({
            email: 'pedro@gmail.com',
            name: 'Pedro',
            password: '123456',
        });

        const { pet } = await petService.create({
            name: 'Luna',
            ownerId: user.id
        });

        await expect(weightDiaryService.create({
            petId: pet.id,
            weight: 4.8,
            date: new Date("Data-inválida")
        })).rejects.toBeInstanceOf(ArgumentNotValidError);
    });

    it('should allow multiple weight diary entries for the same pet on different days', async () => {
        const { user } = await userService.create({
            email: 'pedro@gmail.com',
            name: 'Pedro',
            password: '123456',
        });

        const { pet } = await petService.create({
            name: 'Luna',
            ownerId: user.id
        });

        await weightDiaryService.create({
            petId: pet.id,
            date: new Date('2024-02-14'),
            weight: 5.0
        });

        await weightDiaryService.create({
            petId: pet.id,
            date: new Date('2024-02-20'),
            weight: 5.5
        });

        const { weightDiaries } = await weightDiaryService.findByOwner({ petId: pet.id });

        expect(weightDiaries.length).toBe(2);
        expect(weightDiaries[0].weight).toBe(5.0);
        expect(weightDiaries[1].weight).toBe(5.5);
    });
});
