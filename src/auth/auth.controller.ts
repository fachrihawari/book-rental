import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginWithOtpDto, VerifyOtpDto } from './auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login-with-otp')
  @HttpCode(HttpStatus.OK)
  async loginWithOtp(@Body() { email }: LoginWithOtpDto) {
    await this.authService.sendOtp(email);
  }

  @Post('/verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() { email, otp }: VerifyOtpDto) {
    const accessToken = await this.authService.verifyOtp(email, otp);
    return { accessToken }
  }


  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    return req.user
  }
}
