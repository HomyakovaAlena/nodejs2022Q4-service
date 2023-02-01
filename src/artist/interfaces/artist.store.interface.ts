import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistStore {
  findAll: () => ArtistEntity[];
  findById: (id: string) => ArtistEntity | undefined;
  create: (createArtistDto: CreateArtistDto) => ArtistEntity;
  update: (id: string, updateArtistDto: UpdateArtistDto) => ArtistEntity;
  delete: (id: string) => void;
}
