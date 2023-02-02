import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumStorage } from './store/album.storage';
import { TrackModule } from 'src/track/track.module';
import { InMemoryTrackStorage } from 'src/track/store/track.storage';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumStore',
      useClass: InMemoryAlbumStorage,
    },
    {
      provide: 'TrackStore',
      useClass: InMemoryTrackStorage,
    },
  ],
  imports: [TrackModule],
})
export class AlbumModule {}
