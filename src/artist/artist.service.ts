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

  async findAll() {
    const artistEntities = await this.artistStore.findAll();
    return artistEntities;
  }

  async findById(id: string) {
    const artistEntity = await this.artistStore.findById(id);
    return artistEntity;
  }

  async create(createArtistDto: CreateArtistDto) {
    const artistEntity = await this.artistStore.create(createArtistDto);
    return artistEntity;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistEntity = await this.artistStore.update(id, updateArtistDto);
    return artistEntity;
  }

  async delete(id: string) {
    return await this.artistStore.delete(id);
  }

  async findFavourite() {
    const artists = await this.artistStore.findFavourite();
    return artists;
  }
}
