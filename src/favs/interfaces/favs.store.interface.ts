import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

export interface FavsStore {
  findAll: () => Promise<{
    tracks: TrackEntity[];
    albums: AlbumEntity[];
    artists: ArtistEntity[];
  }>;

  addTrack: (id: string) => Promise<string>;
  addAlbum: (id: string) => Promise<string>;
  addArtist: (id: string) => Promise<string>;

  deleteTrack: (id: string) => Promise<string | undefined>;
  deleteAlbum: (id: string) => Promise<string | undefined>;
  deleteArtist: (id: string) => Promise<string | undefined>;
}
