import VaccineInMemoryRepository from '../../../repository/inMemory/VaccineInMemoryRepository';
import PetInMemoryRepository from '../../../repository/inMemory/PetInMemoryRepository';
import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';
import VaccineService from '../../../service/VaccineService';
import PetService from '../../../service/PetService';
import UserService from '../../../service/UserService';
import ArgumentNotValidError from '../../../service/error/ArgumentNotValidError';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Register service', () => {
    let vaccineRepository: VaccineInMemoryRepository;
    let petRepository: PetInMemoryRepository; 
    let userRepository: UserInMemoryRepository;

    let vaccineService: VaccineService;
    let petService: PetService;
    let userService: UserService;
  
    beforeEach(() => {
      vaccineRepository = new VaccineInMemoryRepository();
      petRepository = new PetInMemoryRepository();
      userRepository = new UserInMemoryRepository();

      vaccineService = new VaccineService(vaccineRepository, petRepository);
      petService = new PetService(
        petRepository,
        userRepository
      )
      userService = new UserService(userRepository);
    });
  
    it('should be able to register a new vaccine', async () => {

      const {user} = await userService.create({
        email: 'pedro@gmail.com',
        name: 'Pedro',
        password: '123456',
      });

      const {pet} = await petService.create({
        name: 'Luna',
        ownerId: user.id
      })

      const {vaccine} = await vaccineService.create({
        name: 'Tetano',
        petId: pet.id,
        location: 'SobralCity'
      })

      expect(vaccine.name).toBe('Tetano');
      expect(vaccine.location).toBe('SobralCity');

    });
  
    it('should not be able to register a new vaccine with an non exist pet', async () => {
        await expect(async () => {
            await vaccineService.create({
                name: 'Luna', 
                petId: 'id-non-existent', 
                location: 'SobralCity'})
            }).rejects.toBeInstanceOf(ArgumentNotValidError);
    });
  });