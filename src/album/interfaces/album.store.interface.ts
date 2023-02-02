import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface AlbumStore {
  findAll: () => AlbumEntity[];
  findById: (id: string) => AlbumEntity | undefined;
  create: (createAlbumDto: CreateAlbumDto) => AlbumEntity;
  update: (id: string, updateAlbumDto: UpdateAlbumDto) => AlbumEntity;
  delete: (id: string) => void;
}
