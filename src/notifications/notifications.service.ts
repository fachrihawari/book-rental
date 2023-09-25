import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { notificationsQueue } from './notifications.constants';
import type { ISendOtpEmail } from './notifications.processor';
import { User } from '~/prisma/models/user';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue(notificationsQueue.name)
    private readonly notificationsQueue: Queue,
  ) {}

  sendOtp(user: User, otp: string) {
    const data: ISendOtpEmail = {
      otp,
      userName: user.name,
      userEmail: user.email,
    };
    this.notificationsQueue.add(notificationsQueue.jobNames.sendOtpEmail, data);
  }
}
