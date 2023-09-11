import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/prisma/models/user';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtp(user: User, otp: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to Book Rental!",
      template: 'otp',
      context: {
        otp,
        name: user.name
      }
    })
  }
}
