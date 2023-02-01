import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryArtistStorage } from './store/artist.storage';
import { TrackModule } from 'src/track/track.module';
import { InMemoryTrackStorage } from 'src/track/store/track.storage';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistStore',
      useClass: InMemoryArtistStorage,
    },
    {
      provide: 'TrackStore',
      useClass: InMemoryTrackStorage,
    },
  ],
  imports: [TrackModule],
})
export class ArtistModule {}
