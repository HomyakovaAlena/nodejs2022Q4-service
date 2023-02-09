import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumStorage } from './store/album.storage';
import { TrackModule } from 'src/track/track.module';
import { InMemoryTrackStorage } from 'src/track/store/track.storage';
import { AlbumEntity } from './entities/album.entity';

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
  imports: [TrackModule, TypeOrmModule.forFeature([AlbumEntity])],
})
export class AlbumModule {}
