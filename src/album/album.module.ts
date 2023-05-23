import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { AlbumEntity } from './entities/album.entity';
import { PostgresAlbumStorage } from './store/postgres-album.storage';
import { PostgresTrackStorage } from 'src/track/store/postgres-track.storage';
import { PostgresArtistStorage } from 'src/artist/store/postgres-artist.storage';
import { ArtistModule } from 'src/artist/artist.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/logger/all-exceptions.filter';
import { LoggerModule } from 'src/logger/logger.module';
import { CustomLoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumStore',
      useClass: PostgresAlbumStorage,
    },
    {
      provide: 'TrackStore',
      useClass: PostgresTrackStorage,
    },
    {
      provide: 'ArtistStore',
      useClass: PostgresArtistStorage,
    },
    JwtAuthGuard,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    CustomLoggerService,
  ],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    TypeOrmModule.forFeature([AlbumEntity]),
    LoggerModule,
  ],
  exports: [TypeOrmModule],
})
export class AlbumModule {}
