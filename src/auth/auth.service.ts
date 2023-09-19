import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  generateOtp() {
    return Math.floor(Math.random() * 9000 + 1000).toString();
  }
}
