import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@features/user/enitity';
import { Optional } from '@cores/types';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findByUsername(username: string): Promise<Optional<UserEntity>> {
    return this.findOne({
      where: {
        username,
      },
    });
  }

  async updateLastLogin(id: string, lastLogin?: Date) {
    const time = lastLogin || new Date();
    return this.update(id, { lastLogin: time });
  }
}
