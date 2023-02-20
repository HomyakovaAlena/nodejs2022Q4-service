import { AlbumResponseDto } from '../dto/album-response.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface IAlbumService {
  findAll: () => Promise<AlbumResponseDto[]>;
  findById: (id: string) => Promise<AlbumResponseDto | undefined>;
  create: (createAlbumDto: CreateAlbumDto) => Promise<AlbumResponseDto>;
  update: (
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ) => Promise<AlbumResponseDto>;
  delete: (id: string) => Promise<string>;
  findFavourite: () => Promise<AlbumResponseDto[] | undefined>;
}
