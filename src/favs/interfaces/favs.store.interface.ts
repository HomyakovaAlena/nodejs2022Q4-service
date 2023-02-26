import { AlbumResponseDto } from 'src/album/dto/album-response.dto';
import { ArtistResponseDto } from 'src/artist/dto/artist-response.dto';
import { TrackResponseDto } from 'src/track/dto/track-response.dto';

export interface FavsStore {
  findAll: () => Promise<{
    tracks: TrackResponseDto[];
    albums: AlbumResponseDto[];
    artists: ArtistResponseDto[];
  }>;

  addTrack: (id: string) => Promise<string>;
  addAlbum: (id: string) => Promise<string>;
  addArtist: (id: string) => Promise<string>;

  deleteTrack: (id: string) => Promise<string | undefined>;
  deleteAlbum: (id: string) => Promise<string | undefined>;
  deleteArtist: (id: string) => Promise<string | undefined>;
}
