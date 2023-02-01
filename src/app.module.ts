import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InMemoryTrackStorage } from './track/store/track.storage';
import { TrackController } from './track/track.controller';
import { TrackModule } from './track/track.module';
import { TrackService } from './track/track.service';
import { InMemoryUserStorage } from './user/store/user.storage';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [UserModule, TrackModule, ConfigModule.forRoot()],
  controllers: [AppController, UserController, TrackController],
  providers: [
    AppService,
    UserService,
    {
      provide: 'UserStore',
      useClass: InMemoryUserStorage,
    },
    TrackService,
    {
      provide: 'TrackStore',
      useClass: InMemoryTrackStorage,
    },
  ],
})
export class AppModule {}
