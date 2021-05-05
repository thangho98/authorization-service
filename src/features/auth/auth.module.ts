import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '@features/auth/local.strategy';
import { accessTokenOption } from '@features/auth/jwt-sign-option';
import { AuthController } from '@features/auth/auth.controller';
import { JwtStrategy } from '@features/auth/jwt.strategy';
import { JwtRefreshTokenStrategy } from '@features/auth/jwt_refresh.strategy';
import { configService } from '@config';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      ...accessTokenOption,
      publicKey: configService.getValue('JWT_ACCESS_TOKEN_PUBLIC_KEY'),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
