import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { LoginCredentialDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: CreateAccountDto) {
    return this.authService.createAccount(body);
  }

  @Post('login')
  login(@Body() body: LoginCredentialDto) {
    return this.authService.login(body);
  }
}
