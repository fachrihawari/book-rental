import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import {
  NotificationsProcessor,
  ISendOtpEmail,
} from './notifications.processor';

describe('NotificationsProcessor', () => {
  let processor: NotificationsProcessor;
  let mailerService: MailerService;

  const mockMailerService: any = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsProcessor,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    processor = module.get<NotificationsProcessor>(NotificationsProcessor);
    mailerService = module.get<MailerService>(MailerService);
  });

  describe('sendOtpEmail', () => {
    it('should send OTP email', async () => {
      const jobData: ISendOtpEmail = {
        otp: '1234',
        userName: 'Test User',
        userEmail: 'test@example.com',
      };
      const job: any = {
        data: jobData,
        progress: jest.fn(),
        log: jest.fn(),
      };

      await processor.sendOtpEmail(job);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: jobData.userEmail,
        subject: 'Welcome to Book Rental!',
        template: 'otp',
        context: {
          otp: jobData.otp,
          name: jobData.userName,
        },
      });
      expect(job.progress).toHaveBeenCalledWith(100);
      expect(job.log).toHaveBeenCalledWith('Send email successfully');
    });
  });
});
