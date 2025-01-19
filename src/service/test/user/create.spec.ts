import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';
import UserService from '../../../service/UserService';
import ArgumentNotValidError from '../../../service/error/ArgumentNotValidError';

import { describe, it, expect, beforeEach } from 'vitest';


describe('Register service', () => {
    let userRepository: UserInMemoryRepository;
    let userService: UserService;
  
    beforeEach(() => {
      userRepository = new UserInMemoryRepository();
      userService = new UserService(userRepository);
    });
  
    it('should be able to register a new user', async () => {
      await expect(async () => {
        await userService.create({
          email: 'pedro@gmail.com',
          name: 'Pedro',
          password: '123456',
        });
      }).not.toThrow();
    });
  
    it('should not be able to register a new user with an existing email', async () => {
      await userService.create({
        name: 'Pedro',
        email: 'pedro@gmail.com',
        password: '123456',
      });
  
      await expect(async () => {
        await userService.create({
          name: 'Pedro2',
          email: 'pedro@gmail.com',
          password: '123456',
        });
      }).rejects.toBeInstanceOf(ArgumentNotValidError);
    });
  });