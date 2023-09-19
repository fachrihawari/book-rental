import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './auth/auth.decorators';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Public()
  @ApiOkResponse({
    schema: {
      properties: {
        message: { type: 'string', example: 'Hello World!' },
      },
    },
  })
  @Get()
  getHello() {
    return {
      message: this.appService.getHello(),
    };
  }
}
