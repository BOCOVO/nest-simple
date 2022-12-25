import { Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { hashValue } from 'src/helper/hashing';
import { PrismaService } from 'src/prisma.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { LoginCredentialDto } from './dtos/login.dto';
import AccountAlreadyExistError from './errors/account-exist';
import AccountNotFound from './errors/account-not-found.error';
import { BadCredentialError } from './errors/bad-credential.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password: rawPassword,
    username,
  }: CreateAccountDto) {
    // check existing acount
    const existing = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    if (existing) {
      throw new AccountAlreadyExistError();
    }

    const hashedPassword = await hashValue(rawPassword);
    const { id, password, ...user } = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    return user;
  }

  async login({ email, password }: LoginCredentialDto) {
    const account = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!account) {
      throw new AccountNotFound();
    }

    const correct = await verify(account.password, password);
    if (!correct) {
      throw new BadCredentialError();
    }

    const payload = { username: account.username, sub: account.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
