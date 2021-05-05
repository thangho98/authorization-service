import { AutoMap, Profile, ProfileBase } from 'nestjsx-automapper';
import { Nullable } from '@cores/types';

export class UserProfileDto {
  @AutoMap()
  public readonly id: string;
  @AutoMap()
  public readonly username: string;
  @AutoMap()
  public readonly email: Nullable<string>;
  @AutoMap()
  public readonly firstName: Nullable<string>;
  @AutoMap()
  public readonly lastName: Nullable<string>;
  @AutoMap()
  public readonly displayName: Nullable<string>;
  @AutoMap()
  public readonly lastLogin: Nullable<number>;
}
