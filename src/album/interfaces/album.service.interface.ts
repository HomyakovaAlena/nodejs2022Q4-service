import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface IAlbumService {
  findAll: () => Promise<AlbumEntity[]>;
  findById: (id: string) => Promise<AlbumEntity | undefined>;
  create: (createAlbumDto: CreateAlbumDto) => Promise<AlbumEntity>;
  update: (id: string, updateAlbumDto: UpdateAlbumDto) => Promise<AlbumEntity>;
  delete: (id: string) => Promise<AlbumEntity>;
}
