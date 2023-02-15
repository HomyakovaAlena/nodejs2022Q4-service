import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackModule } from 'src/track/track.module';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { PostgresAlbumStorage } from 'src/album/store/postgres-album.storage';
import { PostgresArtistStorage } from 'src/artist/store/postgres-artist.storage';
import { PostgresTrackStorage } from 'src/track/store/postgres-track.storage';
import { PostgresFavsStorage } from './store/postgres-favs.storage';
import { FavsEntity } from './entities/favs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    TrackService,
    AlbumService,
    ArtistService,
    {
      provide: 'FavsStore',
      useClass: PostgresFavsStorage,
    },
    {
      provide: 'TrackStore',
      useClass: PostgresTrackStorage,
    },
    {
      provide: 'AlbumStore',
      useClass: PostgresAlbumStorage,
    },
    {
      provide: 'ArtistStore',
      useClass: PostgresArtistStorage,
    },
  ],
  imports: [
    TrackModule,
    ArtistModule,
    AlbumModule,
    TypeOrmModule.forFeature([FavsEntity]),
  ],
  exports: [TypeOrmModule],
})
export class FavsModule {}
