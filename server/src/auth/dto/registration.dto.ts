import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
