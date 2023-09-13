import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    BullModule.forRoot({ redis: process.env.REDIS_URL }),
    BullBoardModule.forRoot({ route: '/queues', adapter: ExpressAdapter }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
