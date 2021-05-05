import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginInput implements Readonly<LoginInput> {
  @ApiProperty({ required: true })
  @IsString()
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;
}
