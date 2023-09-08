import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

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
    // TODO: Send OTP by Email with queue
  }

  async verifyOtp(email: string, otp: string): Promise<string> {
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

    // Generate access token based on user.id dan user.email
    const accessToken = await this.jwtService.signAsync({ sub: user.id, email })

    return accessToken
  }

  async authenticatedUser(id: number) {
    const user = await this.usersService.findById(id);

    // Check if user exists
    if (!user) {
      throw new NotFoundException();
    }

    return user
  }
}
