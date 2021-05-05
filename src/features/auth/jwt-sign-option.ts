import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { configService } from '@config';

const jwtAccessTokenExpirationTime = configService.getValue('JWT_ACCESS_TOKEN_EXPIRATION_TIME');
const jwtRefreshTokenExpirationTime = configService.getValue('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
const accessTokenOption: JwtSignOptions = {
  algorithm: 'RS256',
  privateKey: configService.getValue('JWT_ACCESS_TOKEN_SECRET_KEY'),
  expiresIn: jwtAccessTokenExpirationTime ? `${jwtAccessTokenExpirationTime}s` : 15 * 60, // 15 minutes
  issuer: configService.getValue('JWT_ISSUER') || 'authorization@dev.com',
};

const refreshTokenOption: JwtSignOptions = {
  algorithm: 'HS256',
  secret: configService.getValue('JWT_REFRESH_TOKEN_SECRET_KEY'),
  expiresIn: jwtRefreshTokenExpirationTime ? `${jwtRefreshTokenExpirationTime}s` : 60 * 60 * 24 * 3, // 3 months
  issuer: configService.getValue('JWT_ISSUER') || 'authorization@dev.com',
};
export { accessTokenOption, refreshTokenOption };
