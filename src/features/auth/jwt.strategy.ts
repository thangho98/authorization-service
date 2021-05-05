import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '@features/auth/jwt-payload';
import { configService } from '@config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getValue('JWT_ACCESS_TOKEN_PUBLIC_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
