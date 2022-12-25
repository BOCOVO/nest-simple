import { IsEmail, IsString } from 'class-validator';

export class LoginCredentialDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
