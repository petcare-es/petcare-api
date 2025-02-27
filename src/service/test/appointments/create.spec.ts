import { AppointmentTypes } from 'types/AppointmentType';
import AppointmentInMemoryRepository from '../../../repository/inMemory/AppointmentInMemoryRepository';
import PetInMemoryRepository from '../../../repository/inMemory/PetInMemoryRepository';
import UserInMemoryRepository from '../../../repository/inMemory/UserInMemoryRepository';
import AppointmentService from '../../../service/AppointmentService';
import PetService from '../../../service/PetService';
import UserService from '../../../service/UserService';
import ArgumentNotValidError from '../../../service/error/ArgumentNotValidError';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Register service', () => {
    let appointmentRepository: AppointmentInMemoryRepository;
    let petRepository: PetInMemoryRepository; 
    let userRepository: UserInMemoryRepository;

    let appointmentService: AppointmentService;
    let petService: PetService;
    let userService: UserService;
  
    beforeEach(() => {
      appointmentRepository = new AppointmentInMemoryRepository();
      petRepository = new PetInMemoryRepository();
      userRepository = new UserInMemoryRepository();

      appointmentService = new AppointmentService(
        appointmentRepository, 
        petRepository
      )
      petService = new PetService(
        petRepository,
        userRepository
      )
      userService = new UserService(
        userRepository
      )
    });
  
    it('should be able to register a new appointment', async () => {

      const {user} = await userService.create({
        email: 'pedro@gmail.com',
        name: 'Pedro',
        password: '123456',
      });

      const {pet} = await petService.create({
        name: 'Luna',
        ownerId: user.id
      });

      const {appointment} = await appointmentService.create({ 
        location: "SobralCity",
        name: "Consulta da Luna",
        petId: pet.id,
        scheduledDate: new Date(),
        type: "CONSULTA" as unknown as AppointmentTypes
      });

      expect(appointment.name).toBe('Consulta da Luna');
      expect(appointment.location).toBe('SobralCity');
      expect(appointment.type).toBe("CONSULTA");

    });
  
    it('should not be able to register a new appointment with an non exist pet', async () => {
        await expect(async () => {
            await appointmentService.create({
              petId: 'id-non-existent', 
              location: "SobralCity",
              name: "Consulta da Luna",
              scheduledDate: new Date(),
              type: "CONSULTA" as unknown as AppointmentTypes
            });
        }).rejects.toBeInstanceOf(ArgumentNotValidError);
    });
  });