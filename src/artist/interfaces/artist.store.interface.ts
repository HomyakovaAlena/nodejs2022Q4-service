import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistStore {
  findAll: () => Promise<ArtistEntity[]>;
  findById: (id: string) => Promise<ArtistEntity | undefined>;
  findFavourite: () => Promise<ArtistEntity[] | undefined>;
  addToFavourite: (id: string) => Promise<string | undefined>;
  removeFromFavourite: (id: string) => Promise<string | undefined>;
  create: (createArtistDto: CreateArtistDto) => Promise<ArtistEntity>;
  update: (
    id: string,
    updateArtistDto: UpdateArtistDto,
  ) => Promise<ArtistEntity>;
  delete: (id: string) => Promise<ArtistEntity>;
}
