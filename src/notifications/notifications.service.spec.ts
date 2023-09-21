import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';
import { NotificationsService } from './notifications.service';
import { notificationsQueue } from './notifications.constants';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let queue: Queue;

  const mockQueue = {
    add: jest.fn(),
  };

  beforeEach(async () => {
    const QueueToken = getQueueToken(notificationsQueue.name);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: QueueToken,
          useValue: mockQueue,
        }
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    queue = module.get<Queue>(QueueToken);
  });

  describe('sendOtp', () => {
    it('should add job to queue', () => {
      const user = { id: 1, name: 'Test User', email: 'test@example.com' };
      const otp = '1234';

      service.sendOtp(user, otp);

      expect(queue.add).toHaveBeenCalledWith(
        notificationsQueue.jobNames.sendOtpEmail,
        { otp, userName: user.name, userEmail: user.email },
      );
    });
  });
});