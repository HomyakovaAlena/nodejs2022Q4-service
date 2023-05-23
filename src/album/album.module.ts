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
  ],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  exports: [TypeOrmModule],
})
export class AlbumModule {}
