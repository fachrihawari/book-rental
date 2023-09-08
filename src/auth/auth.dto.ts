import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginWithOtpDto {
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  otp: string;
}
