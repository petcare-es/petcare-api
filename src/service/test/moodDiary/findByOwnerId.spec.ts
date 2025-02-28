import PetInMemoryRepository from '../../../repository/inMemory/PetInMemoryRepository';
import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';

import UserService from '../../../service/UserService';
import PetService from '../../../service/PetService';

import ArgumentNotValidError from '../../../service/error/ArgumentNotValidError';

import { describe, it, expect, beforeEach} from 'vitest';
import MoodDiaryInMemoryRepository from '../../../repository/inMemory/MoodDiaryInMemoryRepostory';
import MoodDiaryService from '../../../service/MoodDiaryService';
import { Mood } from '../../../types/MoodDiaryType';

describe('List MoodDiaries Service', () => {
    let petRepository: PetInMemoryRepository;
    let moodDiaryRepository: MoodDiaryInMemoryRepository;
    let userRepository: UserInMemoryRepository;

    let petService: PetService;
    let moodDiaryService: MoodDiaryService;
    let userService: UserService;

    beforeEach(() => {
        petRepository = new PetInMemoryRepository();
        moodDiaryRepository = new MoodDiaryInMemoryRepository();
        userRepository = new UserInMemoryRepository();

        moodDiaryService = new MoodDiaryService(
            moodDiaryRepository,
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

    it('Shoulder return all moodDiaries for a valid owner', async () => {

        const { user } = await userService.create({
                name:'Pedro',
                email:'pedr@gmail.com',
                password: '123456'
        });

        const { pet } = await petService.create({
            name: "Jublieu",
            ownerId: user.id
        });

        await moodDiaryService.create({
            petId: pet.id,
            mood: Mood.FELIZ,
            date: new Date('2025-02-20')
        });

        const { moodDiaries } = await moodDiaryService.findByOwner({petId: pet.id});

        expect(moodDiaries).toBeInstanceOf(Array);
        expect(moodDiaries).toHaveLength(1);
        expect(moodDiaries[0].mood).toBe(Mood.FELIZ);
    });

    it('should return an empty array if owner has no moodDiaries', async () =>{

        const { user } = await userService.create({
            name:'Pedro',
            email:'pedr@gmail.com',
            password: '123456'
        });

        const { pet } = await petService.create({
            name: "Jublieu",
            ownerId: user.id
        });

        const { moodDiaries } = await moodDiaryService.findByOwner({petId: pet.id});

        expect(moodDiaries).instanceOf(Array);
        expect(moodDiaries).toHaveLength(0);
    });

    it('should throw an erro if owner does not exist', async () =>{
        await expect(async () => {
            await moodDiaryService.findByOwner({ petId: 'id-non-existent' });
        }).rejects.toBeInstanceOf(ArgumentNotValidError);
    });
});