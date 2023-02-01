import { FavsResponseDto } from '../dto/favs-response.dto';

export interface IFavsService {
  findAll: () => FavsResponseDto;

  addTrack: (id: string) => string;
  addAlbum: (id: string) => string;
  addArtist: (id: string) => string;

  deleteTrack: (id: string) => string | undefined;
  deleteAlbum: (id: string) => string | undefined;
  deleteArtist: (id: string) => string | undefined;

  findTrackById: (id: string) => string | undefined;
  findAlbumById: (id: string) => string | undefined;
  findArtistById: (id: string) => string | undefined;
}
