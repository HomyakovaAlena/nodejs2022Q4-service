import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from 'src/track/track.module';
import { PostgresArtistStorage } from './store/postgres-artist.storage';
import { PostgresTrackStorage } from 'src/track/store/postgres-track.storage';
import { ArtistEntity } from './entities/artist.entity';
import { AlbumModule } from 'src/album/album.module';
import { PostgresAlbumStorage } from 'src/album/store/postgres-album.storage';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistStore',
      useClass: PostgresArtistStorage,
    },
    {
      provide: 'AlbumStore',
      useClass: PostgresAlbumStorage,
    },
    {
      provide: 'TrackStore',
      useClass: PostgresTrackStorage,
    },
    JwtAuthGuard,
  ],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  exports: [TypeOrmModule],
})
export class ArtistModule {}
