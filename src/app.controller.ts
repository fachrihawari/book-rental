import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { Book } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello() {
    return {
      message: this.appService.getHello(),
    };
  }

  @Get('/1st')
  async getFirstBook(): Promise<Book> {
    return this.prismaService.book.findFirst();
  }
}
