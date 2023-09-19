import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginWithOtpDto, VerifyOtpDto } from './auth.dto';
import { Public } from './auth.decorators';
import { User } from 'src/prisma/models/user';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @ApiOkResponse({ description: 'OTP sent to the email' })
  @Post('/login-with-otp')
  @HttpCode(HttpStatus.OK)
  async loginWithOtp(@Body() { email }: LoginWithOtpDto) {
    let user = await this.usersService.findByEmail(email);

    // Generate OTP
    const otp = this.authService.generateOtp()

    // Update or Create use with generated otp
    if (user) {
      user = await this.usersService.updateOtpByEmail(email, otp);
    } else {
      user = await this.usersService.createWithEmailAndOtp(email, otp);
    }

    // Add notification
    this.notificationsService.sendOtp(user, otp)
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
    const user = await this.usersService.findByEmail(email);

    // Check if user not exists
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
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email,
    });

    return { accessToken };
  }

  @ApiUnauthorizedResponse({ description: 'Request not authorized' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(User) },
  })
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async profile(@Request() req) {
    const user = await this.usersService.findById(req.user.sub);

    // Check if user not exists
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
