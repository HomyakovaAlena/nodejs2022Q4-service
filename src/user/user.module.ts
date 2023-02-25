import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PostgresUserStorage } from './store/postgres-user.storage';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/logger/all-exceptions.filter';
import { LoggerModule } from 'src/logger/logger.module';
import { CustomLoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserStore',
      useClass: PostgresUserStorage,
    },
    JwtAuthGuard,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    CustomLoggerService,
  ],
  imports: [TypeOrmModule.forFeature([UserEntity]), LoggerModule],
  exports: [TypeOrmModule],
})
export class UserModule {}
