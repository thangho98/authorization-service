import { AutoMap, Profile, ProfileBase } from 'nestjsx-automapper';
import { Nullable } from '@cores/types';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ type: 'string', required: true })
  @AutoMap()
  public readonly id: string;
  @ApiProperty({ type: 'string', required: true })
  @AutoMap()
  public readonly username: string;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @AutoMap()
  public readonly email: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @AutoMap()
  public readonly firstName: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @AutoMap()
  public readonly lastName: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @AutoMap()
  public readonly displayName: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @AutoMap()
  public readonly lastLogin: Nullable<number>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @AutoMap()
  public readonly createdAt: Nullable<number>;
}
