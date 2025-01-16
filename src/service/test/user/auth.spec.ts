import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';
import UserService from '../../../service/UserService';
import ArgumentNotValidError from '../../../service/error/ArgumentNotValidError';

import { describe, it, expect, beforeEach } from 'vitest';

describe('Auth service', () => {
    let userRepository: UserInMemoryRepository;
    let userService: UserService;
  
    beforeEach(() => {
      userRepository = new UserInMemoryRepository();
      userService = new UserService(userRepository);
    });
  
    it('it should be able to auth a user', async () => {
        const { user } = await userService.create({
            email: 'pedro@gmail.com',
            name: 'Pedro',
            password: '123456',
        });

      expect(async () => {
        await userService.auth({
            email: user.email, 
            password: user.password 
        });
      }).not.toThrow();
    });
  
    it('it should not be possible to authenticate with an invalid password', async () => {
      const { user } = await userService.create({
        name: 'Pedro',
        email: 'pedro@gmail.com',
        password: '123456',
      });
  
      expect(async () => {
        await userService.auth({
          email: user.email,
          password: "senha errada",
        });
      }).rejects.toThrow(ArgumentNotValidError);
    });
  });