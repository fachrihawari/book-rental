import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginWithOtpDto, VerifyOtpDto } from './auth.dto';

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
    await this.authService.verifyOtp(email, otp);
  }
}
