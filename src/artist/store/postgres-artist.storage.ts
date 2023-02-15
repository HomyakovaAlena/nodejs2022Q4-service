import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { TrackStore } from 'src/track/interfaces/track.store.interface';
import { IsNull, Not, Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';
import { ArtistStore } from '../interfaces/artist.store.interface';

@Injectable()
export class PostgresArtistStorage implements ArtistStore {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @Inject('TrackStore') private readonly trackStore: TrackStore,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.artistRepository.create({
      ...createArtistDto,
      id: uuidv4(),
      favs: null,
    });
    return await this.artistRepository.save(artist);
  }

  async findAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findById(artistId: string) {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!artist) return;
    return artist;
  }

  async findFavourite() {
    const artists = await this.artistRepository.find({
      where: {
        favs: {
          artists: !IsNull(),
        },
      },
    });
    return artists;
  }

  async removeFromFavourite(id: string) {
    const artist = await this.findById(id);
    const updatedArtist = {
      ...artist,
      favs: null,
    };
    await this.artistRepository.save(updatedArtist);
    return updatedArtist;
  }

  async update(artistId: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!artist) return;
    const updatedArtist = {
      id: artistId,
      ...updateArtistDto,
    };
    await this.artistRepository.update(artistId, updateArtistDto);
    return updatedArtist;
  }

  async delete(artistId: string) {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!artist) return;
    const tracksOfArtist = await this.trackStore.findByArtistId(artistId);
    for (const track of tracksOfArtist) {
      const { artistId, ...rest } = track;
      await this.trackStore.update(track.id, {
        ...rest,
        artistId: null,
      });
    }
    return await this.artistRepository.remove(artist);
  }
}
