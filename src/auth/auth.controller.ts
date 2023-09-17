import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginWithOtpDto, VerifyOtpDto } from './auth.dto';
import { Public } from './auth.decorators';
import { User } from 'src/prisma/models/user';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOkResponse({ description: 'OTP sent to the email' })
  @Post('/login-with-otp')
  @HttpCode(HttpStatus.OK)
  async loginWithOtp(@Body() { email }: LoginWithOtpDto) {
    await this.authService.sendOtp(email);
  }

  @Public()
  @ApiOkResponse({
    description: 'User verified',
    schema: {
      properties: {
        accessToken: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: "OTP doesn't match" })
  @Post('/verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() { email, otp }: VerifyOtpDto) {
    const accessToken = await this.authService.verifyOtp(email, otp);
    return { accessToken };
  }

  @ApiUnauthorizedResponse({ description: 'Request not authorized' })
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(User) },
  })
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async profile(@Request() req) {
    return await this.authService.authenticatedUser(req.user.sub);
  }
}
