import { CreateAlbumDto } from '../dto/create-album.dto';
import { AlbumResponseDto } from '../dto/album-response.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export interface IAlbumService {
  findAll: () => AlbumResponseDto[];
  findById: (id: string) => AlbumResponseDto | undefined;
  create: (createAlbumDto: CreateAlbumDto) => AlbumResponseDto;
  update: (id: string, updateAlbumDto: UpdateAlbumDto) => AlbumResponseDto;
  delete: (id: string) => void;
}
