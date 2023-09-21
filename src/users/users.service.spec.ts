import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';

      const user = {
        id: 1,
        name: 'Test User',
        email,
        otp: '1234',
      }
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

      const result = await service.findByEmail(email);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(result).toEqual(user);
    });
  });

  describe('findById', () => {
    it('should find a user by ID', async () => {
      const user = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        otp: '1234',
      }
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

      const result = await service.findById(user.id);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: user.id },
      });
      expect(result).toEqual(user);
    });
  });

  describe('createWithEmailAndOtp', () => {
    it('should create a new user with email and OTP', async () => {
      const email = 'test@example.com';
      const otp = '1234';

      const user = {
        id: 1,
        name: 'Test User',
        email,
        otp
      }

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(user);

      const result = await service.createWithEmailAndOtp(email, otp);

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: { email, otp },
      });
      expect(result).toEqual(user);
    });
  });

  describe('updateOtpByEmail', () => {
    it('should update a user OTP by email', async () => {
      const email = 'test@example.com';
      const otp = '5678';
      const user = {
        id: 1,
        name: 'Test User',
        email,
        otp
      }
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(user);

      const result = await service.updateOtpByEmail(email, otp);

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { email },
        data: { otp },
      });
      expect(result).toEqual(user);
    });
  });
});