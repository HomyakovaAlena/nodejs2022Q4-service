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
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
    JwtAuthGuard,
  ],
  imports: [TrackModule, ArtistModule, AlbumModule],
})
export class FavsModule {}
