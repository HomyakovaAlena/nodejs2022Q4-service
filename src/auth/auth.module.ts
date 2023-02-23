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
  ],
  exports: [],
})
export class AuthModule {}
