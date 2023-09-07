import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  createWithEmailAndOtp(email: string, otp?: string) {
    return this.prismaService.user.create({
      data: {
        email,
        otp,
      },
    });
  }

  updateOtpByEmail(email: string, otp: string) {
    return this.prismaService.user.update({
      where: { email },
      data: { otp },
    });
  }
}
