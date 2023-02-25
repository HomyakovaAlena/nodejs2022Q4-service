import { JwtModule, JwtService } from '@nestjs/jwt';
import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PostgresUserStorage } from 'src/user/store/postgres-user.storage';
import * as dotenv from 'dotenv';
import { UserModule } from 'src/user/user.module';
import { BadRequestExceptionFilter } from './exception-filters/400-exception.filter';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/logger/all-exceptions.filter';
import { LoggerModule } from 'src/logger/logger.module';
import { CustomLoggerService } from 'src/logger/logger.service';

dotenv.config();

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'UserStore',
      useClass: PostgresUserStorage,
    },
    JwtService,
    BadRequestExceptionFilter,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    CustomLoggerService,
  ],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: +process.env.EXPIRES_IN,
      },
    }),
    UserModule,
    PassportModule,
    LoggerModule,
  ],
  exports: [],
})
export class AuthModule {}
