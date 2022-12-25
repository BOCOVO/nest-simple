import { IsString, IsEmail } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  email?: string;

  @IsString()
  password?: string;

  @IsString()
  username?: string;
}
