import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';
import { ArtistStore } from '../interfaces/artist.store.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { TrackStore } from 'src/track/interfaces/track.store.interface';

@Injectable()
export class InMemoryArtistStorage implements ArtistStore {
  private artists: ArtistEntity[];

  constructor(@Inject('TrackStore') private readonly trackStore: TrackStore) {
    this.artists = [];
  }

  findAll() {
    return this.artists;
  }

  findById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = {
      ...createArtistDto,
      id: uuidv4(),
    };
    this.artists.push(artist);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findById(id);
    if (!artist) return undefined;
    this.artists = this.artists.filter((artist) => artist.id !== id);
    const artistEntity = { id, ...updateArtistDto };
    this.artists.push(artistEntity);
    return artistEntity;
  }

  delete(id: string) {
    const artist = this.findById(id);
    if (!artist) return undefined;
    this.artists = this.artists.filter((artist) => artist.id !== id);

    const tracksOfArtist = this.trackStore.findByArtistId(id);
    tracksOfArtist.forEach((track) => {
      const { artistId, ...rest } = track;
      return this.trackStore.update(track.id, { ...rest, artistId: null });
    });
  }
}
