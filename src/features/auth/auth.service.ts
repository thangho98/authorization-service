import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@features/user/user.service';
import { JwtPayload } from '@features/auth/jwt-payload';
import { accessTokenOption, refreshTokenOption } from '@features/auth/jwt-sign-option';
import { LoginInput } from '@features/auth/dto/login.input';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@features/user/enitity/user.entity';
import { Nullable } from '@cores/types';
import { HttpErrorException } from '../../exceptions';
import { ErrorCodes } from '../../contanst';
import { UserRepository } from '@features/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
@Injectable()
export class AuthService {
  private readonly _userRepository: UserRepository;

  constructor(private readonly connection: Connection, private jwtService: JwtService) {
    this._userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async validateUser(input: LoginInput): Promise<Nullable<UserEntity>> {
    const user = await this._userRepository.findByUsername(input.username);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(input.password, user.password);
      if (isPasswordMatching) {
        return user;
      }
      throw new HttpErrorException(ErrorCodes.PasswordInvalid);
    }
    return null;
  }

  async login(user: UserEntity) {
    this._userRepository.updateLastLogin(user.id, new Date()).then();
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      groups: [],
      roles: [],
      ups: [],
    };
    return {
      accessToken: this.jwtService.sign(payload, accessTokenOption),
      refreshToken: this.jwtService.sign(payload, refreshTokenOption),
    };
  }

  async refreshToken(payloadRefreshToken: JwtPayload) {
    const user = await this._userRepository.findByUsername(payloadRefreshToken.sub);
    if (!user) {
      throw new HttpErrorException(ErrorCodes.AccountNotExist);
    }
    const payload: JwtPayload = {
      username: payloadRefreshToken.username,
      sub: payloadRefreshToken.sub,
      groups: [],
      roles: [],
      ups: [],
    };
    return {
      accessToken: this.jwtService.sign(payload, accessTokenOption),
      refreshToken: this.jwtService.sign(payload, refreshTokenOption),
    };
  }
}
