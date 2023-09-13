import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { NotificationsService } from './notifications.service';
import { mailerConstants, notificationsQueue } from './notifications.constants';
import { NotificationsProcessor } from './notifications.processor';

@Module({
  imports: [
    MailerModule.forRoot(mailerConstants),
    BullModule.registerQueue({ name: notificationsQueue.name })
  ],
  providers: [NotificationsService, NotificationsProcessor],
  exports: [NotificationsService]
})
export class NotificationsModule {}
