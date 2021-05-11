import { Injectable } from '@nestjs/common';
import { Optional } from '@cores/types';
import { UserEntity } from '@features/user/enitity/user.entity';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { UserProfileDto } from '@features/user/dto';
import { HttpErrorException } from '../../exceptions';
import { ErrorCodes } from '../../contanst';
import { UserRepository } from '@features/user/user.repository';
import { UserCreateInput } from '@features/user/dto/user-create.input';
import { UserDto } from '@features/user/dto/user.dto';
import { Connection } from 'typeorm';
import { JwtPayload } from '@features/auth/jwt-payload';

@Injectable()
export class UserService {
  private readonly _userRepository: UserRepository;

  constructor(private readonly connection: Connection, @InjectMapper() private readonly _mapper: AutoMapper) {
    this._userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async create(input: UserCreateInput, auth: JwtPayload) {
    const entity = this._mapper.map(input, UserEntity, UserCreateInput);
    entity.createdBy = auth.username;
    entity.createdById = auth.sub;
    await this._userRepository.save(entity);
    return this._mapper.map(entity, UserProfileDto, UserEntity);
  }

  async findByUsername(username: string): Promise<Optional<UserProfileDto>> {
    const user = await this._userRepository.findByUsername(username);
    if (user) {
      return this._mapper.map(user, UserProfileDto, UserEntity);
    }
    throw new HttpErrorException(ErrorCodes.AccountNotExist);
  }

  async getAll(): Promise<UserDto[]> {
    const results = await this._userRepository.find();
    return this._mapper.mapArray(results, UserDto, UserEntity);
  }

  async findById(id: string): Promise<Optional<UserProfileDto>> {
    const user = await this._userRepository.findOne(id);
    if (user) {
      return this._mapper.map(user, UserProfileDto, UserEntity);
    }
    throw new HttpErrorException(ErrorCodes.AccountNotExist);
  }
}
