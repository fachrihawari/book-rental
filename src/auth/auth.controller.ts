import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginWithOtpDto, VerifyOtpDto } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { User } from 'src/prisma/models/user';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOkResponse({ description: "OTP sent to the email" })
  @Post('/login-with-otp')
  @HttpCode(HttpStatus.OK)
  async loginWithOtp(@Body() { email }: LoginWithOtpDto) {
    await this.authService.sendOtp(email);
  }

  @ApiOkResponse({
    description: "User verified",
    schema: {
      properties: {
        accessToken: { type: "string" },
      },
    }
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiUnauthorizedResponse({ description: "OTP doesn't match" })
  @Post('/verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() { email, otp }: VerifyOtpDto) {
    const accessToken = await this.authService.verifyOtp(email, otp);
    return { accessToken }
  }

  @ApiUnauthorizedResponse({ description: "Request not authorized" })
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(User) }
  })
  @UseGuards(AuthGuard)
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async profile(@Request() req) {
    return await this.authService.authenticatedUser(req.user.sub)
  }
}
