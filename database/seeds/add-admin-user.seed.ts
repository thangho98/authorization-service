// add-admin-user.seed.ts
import { Factory, Seeder } from 'typeorm-seeding';
import { UserEntity } from '../../src/features/user/enitity/user.entity';
import { Connection } from 'typeorm';
import { UserStatus } from '../../src/features/user/user.status';

export default class AddAdminUserSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(UserEntity)().create();
  }
}
