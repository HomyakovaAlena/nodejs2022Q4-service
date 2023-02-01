import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { InMemoryFavsStorage } from './store/favs.storage';
import { TrackModule } from 'src/track/track.module';
import { InMemoryTrackStorage } from 'src/track/store/track.storage';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { InMemoryAlbumStorage } from 'src/album/store/album.storage';
import { InMemoryArtistStorage } from 'src/artist/store/artist.storage';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    TrackService,
    AlbumService,
    ArtistService,
    {
      provide: 'FavsStore',
      useClass: InMemoryFavsStorage,
    },
    {
      provide: 'TrackStore',
      useClass: InMemoryTrackStorage,
    },
    {
      provide: 'AlbumStore',
      useClass: InMemoryAlbumStorage,
    },
    {
      provide: 'ArtistStore',
      useClass: InMemoryArtistStorage,
    },
  ],
  imports: [TrackModule],
})
export class FavsModule {}
