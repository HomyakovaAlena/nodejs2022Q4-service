import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface AlbumStore {
  findAll: () => Promise<AlbumEntity[]>;
  findById: (id: string) => Promise<AlbumEntity | undefined>;
  findFavourite: () => Promise<AlbumEntity[] | undefined>;
  addToFavourite: (id: string) => Promise<string | undefined>;
  removeFromFavourite: (id: string) => Promise<string | undefined>;
  create: (createAlbumDto: CreateAlbumDto) => Promise<AlbumEntity>;
  update: (id: string, updateAlbumDto: UpdateAlbumDto) => Promise<AlbumEntity>;
  delete: (id: string) => Promise<AlbumEntity>;
}
