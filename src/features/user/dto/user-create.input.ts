import { AutoMap } from 'nestjsx-automapper';
import { Nullable } from '@cores/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserCreateInput {
  @ApiProperty({ required: true })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @ApiProperty({ required: true })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @ApiProperty({ required: false, nullable: true })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public readonly email?: string;

  @ApiProperty({ required: false, nullable: true })
  @AutoMap()
  @IsString()
  public readonly firstName?: string;

  @ApiProperty({ required: false, nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly lastName?: string;

  @ApiProperty({ required: false, nullable: true })
  @AutoMap()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public readonly displayName: string;
}
