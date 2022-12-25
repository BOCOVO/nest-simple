import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ENV_CONSTANTS } from 'src/constant/env-const';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
      secretOrPrivateKey: ENV_CONSTANTS.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
