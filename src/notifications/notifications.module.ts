import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { NotificationsService } from './notifications.service';
import { mailerConstants } from './notifications.constants';

@Module({
  imports: [
    MailerModule.forRoot(mailerConstants),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService]
})
export class NotificationsModule {}
