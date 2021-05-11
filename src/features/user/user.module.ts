import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '@features/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@features/user/enitity/user.entity';
import './mapper/user.profile';
import { UserRepository } from '@features/user/user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}
