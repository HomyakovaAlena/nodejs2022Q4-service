import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

export class FavsDto {
  tracks: TrackEntity[];
  albums: AlbumEntity[];
  artists: ArtistEntity[];
}
