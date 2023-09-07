export class LoginWithOtpDto {
  email: string;
}

export class VerifyOtpDto {
  email: string;
  otp: string;
}
