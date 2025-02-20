import PetInMemoryRepository from '../../../repository/inMemory/PetInMemoryRepository';
import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';
import PetService from '../../PetService';
import UserService from '../../UserService';
import ArgumentNotValidError from '../../error/ArgumentNotValidError';
import { describe, it, expect, beforeEach } from 'vitest';
import MoodDiaryInMemoryRepository from '../../../repository/inMemory/MoodDiaryInMemoryRepostory';
import MoodDiaryService from '../../MoodDiaryService';
import { Mood } from '@prisma/client';

describe('Register service', () => {
    let moodDiaryRepository: MoodDiaryInMemoryRepository;
    let petRepository: PetInMemoryRepository; 
    let userRepository: UserInMemoryRepository;

    let moodDiaryService: MoodDiaryService;
    let petService: PetService;
    let userService: UserService;
  
    beforeEach(() => {
      moodDiaryRepository = new MoodDiaryInMemoryRepository();
      petRepository = new PetInMemoryRepository();
      userRepository = new UserInMemoryRepository();

      moodDiaryService = new MoodDiaryService(moodDiaryRepository, petRepository);
      petService = new PetService(petRepository, userRepository)
      userService = new UserService(userRepository);
    });
  
    it('should be able to register a new moodDiary', async () => {

      const { user } = await userService.create({
        email: 'pedro@gmail.com',
        name: 'Pedro',
        password: '123456',
      });

      const { pet } = await petService.create({
        name: 'Luna',
        ownerId: user.id
      })

      const { moodDiary } = await moodDiaryService.create({
        mood: Mood.FELIZ,
        petId: pet.id,
        date: new Date("2025-02-20"),
      })

      expect(moodDiary.mood).toBe('FELIZ');
      expect(moodDiary.date).toBeInstanceOf(Date);

    });
  
    it('should not be able to register a new moodDiary with an non exist pet', async () => {
        await expect(async () => {
            await moodDiaryService.create({
              mood: Mood.FELIZ,
              petId: "id-non-existent",
              date: new Date()
            })
        }).rejects.toBeInstanceOf(ArgumentNotValidError);
    });

    it('should not create a mood diary with an invalid mood', async () => {
        await expect(moodDiaryService.create({
            petId: 'some-pet-id',
            mood: "INVALIDO" as Mood,
            date: new Date()
        })).rejects.toBeInstanceOf(ArgumentNotValidError);
    });

    it('should not create a mood diary with an invalid date', async () => {
        const { user } = await userService.create({
            email: 'pedro@gmail.com',
            name: 'Pedro',
            password: '123456',
          });
    
        const { pet } = await petService.create({
            name: 'Luna',
            ownerId: user.id
        })

        await expect(moodDiaryService.create({
            petId: pet.id,
            mood: Mood.TRISTE,
            date: new Date("Data-inválida")
        })).rejects.toBeInstanceOf(ArgumentNotValidError);
    });

    it('should allow multiples mood diaries for the same pet on different days', async () => {
        const { user } = await userService.create({
            email: 'pedro@gmail.com',
            name: 'Pedro',
            password: '123456',
          });
    
        const { pet } = await petService.create({
            name: 'Luna',
            ownerId: user.id
        })

        await moodDiaryService.create({
            petId: pet.id,
            date: new Date('2024-02-14'),
            mood: Mood.ANCIOSO
        })

        await moodDiaryService.create({
          petId: pet.id,
          date: new Date('2024-02-20'),
          mood: Mood.FELIZ
        })

        const { moodDiaries } = await moodDiaryService.findByOwner({ petId: pet.id });

        expect(moodDiaries.length).toBe(2);
        expect(moodDiaries[0].mood).toBe(Mood.ANCIOSO);
        expect(moodDiaries[1].mood).toBe(Mood.FELIZ);

    });
  });