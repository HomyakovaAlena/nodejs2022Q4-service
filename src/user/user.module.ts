import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryUserStorage } from './store/user.storage';
import { UserEntity } from './entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserStore',
      useClass: InMemoryUserStorage,
    },
  ],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
