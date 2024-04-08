import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';


import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants'; // Chứa secret key JWT
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
    UserModule],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
