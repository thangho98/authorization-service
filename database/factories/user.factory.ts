import { define } from 'typeorm-seeding';
import { UserEntity } from '../../src/features/user/enitity/user.entity';
import { UserStatus } from '../../src/features/user/user.status';

define(UserEntity, () => {
  const user = new UserEntity();
  user.username = 'admin';
  user.isActive = true;
  user.firstName = 'admin';
  user.lastName = 'admin';
  user.displayName = 'admin';
  user.email = 'admin@dev.com';
  user.status = UserStatus.Activate;
  user.password = 'admin@123';
  return user;
});
