import { Injectable } from '@nestjs/common';
import { Optional } from '@cores/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@features/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _usersRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<Optional<UserEntity>> {
    return this._usersRepository.findOne();
  }

  async findById(id: string): Promise<Optional<UserEntity>> {
    return this._usersRepository.findOne(id);
  }
}
