import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '@features/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@features/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
