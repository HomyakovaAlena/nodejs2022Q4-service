import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtistService } from './interfaces/artist.service.interface';
import { ArtistStore } from './interfaces/artist.store.interface';

@Injectable()
export class ArtistService implements IArtistService {
  constructor(
    @Inject('ArtistStore') private readonly artistStore: ArtistStore,
  ) {}

  findAll() {
    const artistEntities = this.artistStore.findAll();
    return artistEntities;
  }

  findById(id: string) {
    const artistEntity = this.artistStore.findById(id);
    return artistEntity;
  }

  create(createArtistDto: CreateArtistDto) {
    const artistEntity = this.artistStore.create(createArtistDto);
    return artistEntity;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistEntity = this.artistStore.update(id, updateArtistDto);
    return artistEntity;
  }

  delete(id: string) {
    this.artistStore.delete(id);
  }
}
