import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from 'src/track/track.module';
import { PostgresArtistStorage } from './store/postgres-artist.storage';
import { PostgresTrackStorage } from 'src/track/store/postgres-track.storage';
import { ArtistEntity } from './entities/artist.entity';
import { AlbumModule } from 'src/album/album.module';
import { PostgresAlbumStorage } from 'src/album/store/postgres-album.storage';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AllExceptionsFilter } from 'src/logger/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'src/logger/logger.module';
import { CustomLoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistStore',
      useClass: PostgresArtistStorage,
    },
    {
      provide: 'AlbumStore',
      useClass: PostgresAlbumStorage,
    },
    {
      provide: 'TrackStore',
      useClass: PostgresTrackStorage,
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
    forwardRef(() => AlbumModule),
    TypeOrmModule.forFeature([ArtistEntity]),
    LoggerModule,
  ],
  exports: [TypeOrmModule],
})
export class ArtistModule {}
