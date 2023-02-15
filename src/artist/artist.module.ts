import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from 'src/track/track.module';
import { PostgresArtistStorage } from './store/postgres-artist.storage';
import { PostgresTrackStorage } from 'src/track/store/postgres-track.storage';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistStore',
      useClass: PostgresArtistStorage,
    },
    {
      provide: 'TrackStore',
      useClass: PostgresTrackStorage,
    },
  ],
  imports: [TrackModule, TypeOrmModule.forFeature([ArtistEntity])],
  exports: [TypeOrmModule],
})
export class ArtistModule {}
