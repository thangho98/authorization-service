import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpErrorException } from '../../exceptions';
import { ErrorCodes } from '../../contanst';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ username, password });
    if (!user) {
      throw new HttpErrorException(ErrorCodes.AccountNotExist);
    }
    if (!user.isActive) {
      throw new HttpErrorException(ErrorCodes.AccountDeactivated);
    }
    if (user.deletedAt) {
      throw new HttpErrorException(ErrorCodes.AccountDeleted);
    }
    return user;
  }
}
