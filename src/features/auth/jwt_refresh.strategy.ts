import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { configService } from '@config';
import { JwtPayload } from '@features/auth/jwt-payload';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.body?.refreshToken;
        },
      ]),
      secretOrKey: configService.getValue('JWT_REFRESH_TOKEN_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
