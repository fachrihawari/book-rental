import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './auth.constants';

@Module({
  imports: [UsersModule, JwtModule.register({
    ...jwtConstants,
    global: true
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
