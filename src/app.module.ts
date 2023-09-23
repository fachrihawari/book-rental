import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { BooksModule } from './books/books.module';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [
    BullModule.forRoot({ redis: process.env.REDIS_URL }),
    BullBoardModule.forRoot({ route: '/queues', adapter: ExpressAdapter }),
    PrismaModule,
    AuthModule,
    BooksModule,
    WishlistsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
