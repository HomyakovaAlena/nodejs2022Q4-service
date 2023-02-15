import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';
import { TrackStore } from '../interfaces/track.store.interface';
import { AlbumStore } from 'src/album/interfaces/album.store.interface';
import { ArtistStore } from 'src/artist/interfaces/artist.store.interface';
@Injectable()
export class PostgresTrackStorage implements TrackStore {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(forwardRef(() => 'AlbumStore'))
    private readonly albumStore: AlbumStore,
    @Inject(forwardRef(() => 'ArtistStore'))
    private readonly artistStore: ArtistStore,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const { albumId, artistId, ...rest } = createTrackDto;
    const albumEntity = albumId
      ? await this.albumStore.findById(albumId)
      : null;
    const artistEntity = artistId
      ? await this.artistStore.findById(artistId)
      : null;
    const track = await this.trackRepository.create({
      album: albumEntity,
      artist: artistEntity,
      ...rest,
    });
    return await this.trackRepository.save(track);
  }

  async findAll() {
    const tracks = await this.trackRepository.find({
      relations: {
        artist: true,
        album: true,
      },
    });
    return tracks;
  }

  async findById(trackId: string) {
    const track = await this.trackRepository.findOne({
      relations: {
        artist: true,
        album: true,
      },
      where: {
        id: trackId,
      },
    });
    if (!track) return;
    return track;
  }

  async findByArtistId(artistId: string) {
    const track = await this.trackRepository.find({
      relations: {
        album: true,
        artist: true,
      },
      where: {
        artist: {
          id: artistId,
        },
      },
    });
    if (!track) return;
    return track;
  }

  async findByAlbumId(albumId: string) {
    const track = await this.trackRepository.find({
      relations: {
        album: true,
        artist: true,
      },
      where: {
        album: {
          id: albumId,
        },
      },
    });
    if (!track) return;
    return track;
  }

  async update(trackId: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findById(trackId);
    if (!track) return;

    const { albumId, artistId, ...rest } = updateTrackDto;
    const albumEntity = albumId
      ? await this.albumStore.findById(albumId)
      : null;
    const artistEntity = artistId
      ? await this.artistStore.findById(artistId)
      : null;
    const updatedTrack = {
      id: trackId,
      ...track,
      album: albumEntity,
      artist: artistEntity,
      ...rest,
    };
    await this.trackRepository.save(updateTrackDto);
    return updatedTrack;
  }

  async delete(trackId: string) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!track) return;
    return track ? await this.trackRepository.remove(track) : undefined;
  }

  async findFavourite() {
    const tracks = await this.trackRepository.find({
      relations: {
        artist: true,
        album: true,
      },
      where: {
        isFavourite: true,
      },
    });
    return tracks;
  }

  async addToFavourite(id: string) {
    const track = await this.findById(id);
    if (!track) return;
    const updatedTrack = { ...track, isFavourite: true, id };
    await this.trackRepository.save(updatedTrack);
    return id;
  }

  async removeFromFavourite(id: string) {
    const track = await this.findById(id);
    if (!track) return;
    const updatedTrack = { ...track, isFavourite: false };
    await this.trackRepository.save(updatedTrack);
    return id;
  }
}
