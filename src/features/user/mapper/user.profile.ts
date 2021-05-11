import { AutoMapper, InjectMapper, mapFrom, Profile, ProfileBase } from 'nestjsx-automapper';
import { UserEntity } from '@features/user/enitity/user.entity';
import { UserProfileDto } from '@features/user/dto';
import { UserCreateInput } from '@features/user/dto/user-create.input';
import { UserDto } from '@features/user/dto/user.dto';
import { generateUUID } from '@cores/utils';
@Profile()
class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(UserEntity, UserProfileDto).forMember(
      (dest) => dest.lastLogin,
      mapFrom((src) => (src.lastLogin ? src.lastLogin.getTime() : null)),
    );
    mapper
      .createMap(UserEntity, UserDto)
      .forMember(
        (dest) => dest.lastLogin,
        mapFrom((src) => (src.lastLogin ? src.lastLogin.getTime() : null)),
      )
      .forMember(
        (dest) => dest.createdAt,
        mapFrom((src) => (src.createdAt ? src.createdAt.getTime() : null)),
      );
    mapper.createMap(UserCreateInput, UserEntity).forMember(
      (destination) => destination.id,
      mapFrom((src) => generateUUID()),
    );
  }
}
