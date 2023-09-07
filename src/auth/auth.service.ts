import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async sendOtp(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    const otp = Math.floor(Math.random() * 9000 + 1000).toString();
    console.log(
      '🚀 ~ file: auth.service.ts:12 ~ AuthService ~ sendOtp ~ otp:',
      otp,
    );

    if (user) {
      await this.usersService.updateOtpByEmail(email, otp);
    } else {
      await this.usersService.createWithEmailAndOtp(email, otp);
    }
    // TODO: 2. Send OTP by Email
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.usersService.findByEmail(email);

    // Check if user exists
    if (!user) {
      throw new NotFoundException();
    }

    // Check if otp is not match
    if (user.otp !== otp) {
      throw new UnauthorizedException();
    }

    // Reset OTP to empty string
    await this.usersService.updateOtpByEmail(email, null);
  }
}
