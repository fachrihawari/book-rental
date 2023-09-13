import { Process, Processor } from '@nestjs/bull'
import { notificationsQueue } from './notifications.constants';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

export interface ISendOtpEmail {
  otp: string,
  userName: string
  userEmail: string
}

@Processor(notificationsQueue.name)
export class NotificationsProcessor {

  constructor(
    private readonly mailerService: MailerService,
  ) {}

  @Process(notificationsQueue.jobNames.sendOtpEmail)
  async sendOtpEmail(job: Job<ISendOtpEmail>) {
    const { userEmail, userName, otp } = job.data
    await this.mailerService.sendMail({
      to: userEmail,
      subject: "Welcome to Book Rental!",
      template: 'otp',
      context: {
        otp,
        name: userName
      }
    })
  }
}
