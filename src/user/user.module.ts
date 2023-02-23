import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PostgresUserStorage } from './store/postgres-user.storage';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserStore',
      useClass: PostgresUserStorage,
    },
    JwtAuthGuard,
  ],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule],
})
export class UserModule {}
