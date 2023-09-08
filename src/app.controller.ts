import { Controller, Get } from '@nestjs/common';
import { Book } from '@prisma/client';
import { ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModel } from './prisma/models';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @ApiOkResponse({
    schema: {
      properties: {
        message: { type: 'string', example: "Hello World!" }
      }
    }
  })
  @Get()
  getHello() {
    return {
      message: this.appService.getHello(),
    };
  }

  @ApiOkResponse({
    schema: {
      nullable: true,
      $ref: getSchemaPath(PrismaModel.Book)
    }
  })
  @Get('/1st')
  async getFirstBook(): Promise<Book> {
    return this.prismaService.book.findFirst();
  }
}
