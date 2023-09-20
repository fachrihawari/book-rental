import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { getQueueToken } from '@nestjs/bull';
import { notificationsQueue } from 'src/notifications/notifications.constants';

describe('AuthController', () => {
  let controller: AuthController;

  const mockBullQueue: any = {
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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
