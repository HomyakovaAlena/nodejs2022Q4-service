import { CreateArtistDto } from '../dto/create-artist.dto';
import { ArtistResponseDto } from '../dto/artist-response.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

export interface IArtistService {
  findAll: () => ArtistResponseDto[];
  findById: (id: string) => ArtistResponseDto | undefined;
  create: (createArtistDto: CreateArtistDto) => ArtistResponseDto;
  update: (id: string, updateArtistDto: UpdateArtistDto) => ArtistResponseDto;
  delete: (id: string) => void;
}
