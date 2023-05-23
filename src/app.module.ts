import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    UserModule,
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    FavsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...dataSourceConfig,
    }),
  ],
  controllers: [
    AppController,
    TrackController,
    AlbumController,
    ArtistController,
    FavsController,
    UserController,
  ],
  providers: [
    AppService,
    UserService,
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
  ],
})
export class AppModule {}
