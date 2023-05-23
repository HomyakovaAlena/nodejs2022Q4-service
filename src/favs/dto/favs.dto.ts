import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class FavsDto {
  @ApiProperty()
  tracks: TrackEntity[];
  @ApiProperty()
  albums: AlbumEntity[];
  @ApiProperty()
  artists: ArtistEntity[];
}
