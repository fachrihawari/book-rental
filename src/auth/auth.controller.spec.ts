import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getQueueToken } from '@nestjs/bull';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { notificationsQueue } from 'src/notifications/notifications.constants';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  let notificationsService: NotificationsService;
  let jwtService: JwtService;

  const mockBullQueue = {
    add: jest.fn(),
    process: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        PrismaService,
        UsersService,
        JwtService,
        NotificationsService,
        {
          provide: getQueueToken(notificationsQueue.name),
          useValue: mockBullQueue,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    notificationsService =
      module.get<NotificationsService>(NotificationsService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('loginWithOtp', () => {
    it('should send OTP to the email', async () => {
      const email = 'test@example.com';
      const otp = '1234';
      const user = {
        id: 1,
        name: null,
        email,
        otp,
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(usersService, 'createWithEmailAndOtp').mockResolvedValue(user);
      jest.spyOn(authService, 'generateOtp').mockReturnValue(otp);
      jest.spyOn(notificationsService, 'sendOtp');

      await controller.loginWithOtp({ email });

      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
      expect(usersService.createWithEmailAndOtp).toHaveBeenCalledWith(
        email,
        otp,
      );
      expect(authService.generateOtp).toHaveBeenCalled();
      expect(notificationsService.sendOtp).toHaveBeenCalledWith(user, otp);
    });

    it('should update OTP for existing user', async () => {
      const email = 'test@example.com';
      const otp = '1234';

      const user = {
        id: 1,
        name: null,
        email,
        otp: '5678',
      };

      const updatedUser = { ...user, otp };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest
        .spyOn(usersService, 'updateOtpByEmail')
        .mockResolvedValue(updatedUser);
      jest.spyOn(authService, 'generateOtp').mockReturnValue(otp);
      jest.spyOn(notificationsService, 'sendOtp');

      await controller.loginWithOtp({ email });

      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
      expect(usersService.updateOtpByEmail).toHaveBeenCalledWith(email, otp);
      expect(authService.generateOtp).toHaveBeenCalled();
      expect(notificationsService.sendOtp).toHaveBeenCalledWith(
        updatedUser,
        otp,
      );
    });
  });

  describe('verifyOtp', () => {
    it('should return access token if OTP is correct', async () => {
      const email = 'test@example.com';
      const otp = '1234';
      const user = { id: 1, name: null, email, otp };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(usersService, 'updateOtpByEmail').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('access_token');

      const result = await controller.verifyOtp({ email, otp });

      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
      expect(usersService.updateOtpByEmail).toHaveBeenCalledWith(email, null);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: user.id,
        email,
      });
      expect(result).toEqual({ accessToken: 'access_token' });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const email = 'test@example.com';
      const otp = '1234';

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      await expect(controller.verifyOtp({ email, otp })).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException if OTP is incorrect', async () => {
      const email = 'test@example.com';
      const otp = '1234';
      const user = { id: 1, name: null, email, otp: '5678' };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);

      await expect(controller.verifyOtp({ email, otp })).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  describe('profile', () => {
    it('should return user profile', async () => {
      const user = { id: 1, name: null, email: 'test@example.com', otp: null };

      jest.spyOn(usersService, 'findById').mockResolvedValue(user);

      const result = await controller.profile({ user: { sub: user.id } });

      expect(usersService.findById).toHaveBeenCalledWith(user.id);
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const user = { id: 1, email: 'test@example.com' };

      jest.spyOn(usersService, 'findById').mockResolvedValue(null);

      await expect(
        controller.profile({ user: { sub: user.id } }),
      ).rejects.toThrowError('Not Found');
    });
  });
});
