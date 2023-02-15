import { CreateArtistDto } from '../dto/create-artist.dto';
import { ArtistResponseDto } from '../dto/artist-response.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface IArtistService {
  findAll: () => Promise<ArtistResponseDto[]>;
  findById: (id: string) => Promise<ArtistResponseDto | undefined>;
  create: (createArtistDto: CreateArtistDto) => Promise<ArtistResponseDto>;
  update: (
    id: string,
    updateArtistDto: UpdateArtistDto,
  ) => Promise<ArtistResponseDto>;
  delete: (id: string) => Promise<ArtistEntity>;
}
