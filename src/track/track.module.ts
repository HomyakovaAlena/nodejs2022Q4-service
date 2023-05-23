import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackEntity } from './entities/track.entity';
import { PostgresTrackStorage } from './store/postgres-track.storage';
import { PostgresArtistStorage } from 'src/artist/store/postgres-artist.storage';
import { PostgresAlbumStorage } from 'src/album/store/postgres-album.storage';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/logger/all-exceptions.filter';
import { LoggerModule } from 'src/logger/logger.module';
import { CustomLoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'TrackStore',
      useClass: PostgresTrackStorage,
    },
    {
      provide: 'ArtistStore',
      useClass: PostgresArtistStorage,
    },
    {
      provide: 'AlbumStore',
      useClass: PostgresAlbumStorage,
    },
    JwtAuthGuard,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    CustomLoggerService,
  ],
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    LoggerModule,
  ],
  exports: [TypeOrmModule],
})
export class TrackModule {}
