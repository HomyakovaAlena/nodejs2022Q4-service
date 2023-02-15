import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackEntity } from './entities/track.entity';
import { PostgresTrackStorage } from './store/postgres-track.storage';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'TrackStore',
      useClass: PostgresTrackStorage,
    },
  ],
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  exports: [TypeOrmModule],
})
export class TrackModule {}
