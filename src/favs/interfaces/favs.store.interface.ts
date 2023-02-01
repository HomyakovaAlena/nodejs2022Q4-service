import { FavsEntity } from '../entities/favs.entity';

export interface FavsStore {
  findAll: () => FavsEntity;

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
