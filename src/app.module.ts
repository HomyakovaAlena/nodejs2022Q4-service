import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from '../typeorm.config';
import { AlbumController } from './album/album.controller';
import { AlbumModule } from './album/album.module';
import { AlbumService } from './album/album.service';
import { PostgresAlbumStorage } from './album/store/postgres-album.storage';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistModule } from './artist/artist.module';
import { ArtistService } from './artist/artist.service';
import { PostgresArtistStorage } from './artist/store/postgres-artist.storage';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { FavsController } from './favs/favs.controller';
import { FavsModule } from './favs/favs.module';
import { FavsService } from './favs/favs.service';
import { PostgresFavsStorage } from './favs/store/postgres-favs.storage';
import { PostgresTrackStorage } from './track/store/postgres-track.storage';
import { TrackController } from './track/track.controller';
import { TrackModule } from './track/track.module';
import { TrackService } from './track/track.service';
import { PostgresUserStorage } from './user/store/postgres-user.storage';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { LoggerModule } from './logger/logger.module';
import { CustomLoggerService } from './logger/logger.service';
import CustomLoggerMiddleware from './logger/logger.middleware';
import { AllExceptionsFilter } from './logger/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    AuthModule,
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    FavsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...dataSourceConfig,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: +process.env.EXPIRES_IN,
      },
    }),
    LoggerModule,
  ],
  controllers: [
    AppController,
    TrackController,
    AlbumController,
    ArtistController,
    FavsController,
    UserController,
    AuthController,
  ],
  providers: [
    AppService,
    UserService,
    AuthService,
    JwtService,
    {
      provide: 'UserStore',
      useClass: PostgresUserStorage,
    },
    TrackService,
    {
      provide: 'TrackStore',
      useClass: PostgresTrackStorage,
    },
    ArtistService,
    {
      provide: 'ArtistStore',
      useClass: PostgresArtistStorage,
    },
    AlbumService,
    {
      provide: 'AlbumStore',
      useClass: PostgresAlbumStorage,
    },
    FavsService,
    {
      provide: 'FavsStore',
      useClass: PostgresFavsStorage,
    },
    CustomLoggerService,
    CustomLoggerMiddleware,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomLoggerMiddleware).forRoutes('*');
  }
}
