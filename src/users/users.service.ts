import { Injectable } from '@nestjs/common';
import { User } from '~/prisma/models/user';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  findById(id: number): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  createWithEmailAndOtp(email: string, otp?: string): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email,
        otp,
      },
    });
  }

  updateOtpByEmail(email: string, otp: string): Promise<User> {
    return this.prismaService.user.update({
      where: { email },
      data: { otp },
    });
  }
}
