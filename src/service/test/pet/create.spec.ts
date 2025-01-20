import PetInMemoryRepository from '../../../repository/inMemory/PetInMemoryRepository';
import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';

import PetService from '../../../service/PetService';
import UserService from '../../../service/UserService';

import ArgumentNotValidError from '../../../service/error/ArgumentNotValidError';

import { describe, it, expect, beforeEach } from 'vitest';

describe('Register service', () => {
    let userRepository: UserInMemoryRepository;
    let petRepository: PetInMemoryRepository; 

    let userService: UserService;
    let petService: PetService;
  
    beforeEach(() => {
      userRepository = new UserInMemoryRepository();
      petRepository = new PetInMemoryRepository();

      userService = new UserService(userRepository);
      petService = new PetService(
        petRepository,
        userRepository
      )
    });
  
    it('should be able to register a new pet', async () => {

      const {user} = await userService.create({
        email: 'pedro@gmail.com',
        name: 'Pedro',
        password: '123456',
      });

      await expect(async () => {
        await petService.create({
          name: "Jubileu",
          ownerId: user.id
        });
      }).not.toThrow();
    });
  
    it('should not be able to register a new pet with an non exist user', async () => {
  
      await expect(async () => {
        await petService.create({
          name: 'Pedro Henrique',
          ownerId: '123456',
        });
      }).rejects.toBeInstanceOf(ArgumentNotValidError);
    });
  });