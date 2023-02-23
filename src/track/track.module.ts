import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackEntity } from './entities/track.entity';
import { PostgresTrackStorage } from './store/postgres-track.storage';
import { PostgresArtistStorage } from 'src/artist/store/postgres-artist.storage';
import { PostgresAlbumStorage } from 'src/album/store/postgres-album.storage';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'TrackStore',
      useClass: PostgresTrackStorage,
    },
    {
      provide: 'ArtistStore',
      useClass: PostgresArtistStorage,
    },
    {
      provide: 'AlbumStore',
      useClass: PostgresAlbumStorage,
    },
    JwtAuthGuard,
  ],
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
  ],
  exports: [TypeOrmModule],
})
export class TrackModule {}
