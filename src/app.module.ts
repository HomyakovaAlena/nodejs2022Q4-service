import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InMemoryUserStorage } from './user/store/user.storage';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [UserModule, ConfigModule.forRoot()],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    {
      provide: 'UserStore',
      useClass: InMemoryUserStorage,
    },
  ],
})
export class AppModule {}
