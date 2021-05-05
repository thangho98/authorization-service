import { AutoMapper, InjectMapper, mapFrom, Profile, ProfileBase } from 'nestjsx-automapper';
import { UserEntity } from '@features/user/user.entity';
import { UserProfileDto } from '@features/user/dto';
@Profile()
class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(UserEntity, UserProfileDto).forMember(
      (dest) => dest.lastLogin,
      mapFrom((src) => (src.lastLogin ? src.lastLogin.getTime() : null)),
    );
  }
}
