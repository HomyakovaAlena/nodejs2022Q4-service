import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTrackStorage } from './store/track.storage';
import { TrackEntity } from './entities/track.entity';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'TrackStore',
      useClass: InMemoryTrackStorage,
    },
  ],
  imports: [TypeOrmModule.forFeature([TrackEntity])],
})
export class TrackModule {}
