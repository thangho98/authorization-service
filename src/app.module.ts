import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from '@config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@features/user/user.module';
import { AuthModule } from '@features/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
