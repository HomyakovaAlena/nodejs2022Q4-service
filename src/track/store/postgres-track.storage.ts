import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';
import { TrackStore } from '../interfaces/track.store.interface';

@Injectable()
export class PostgresTrackStorage implements TrackStore {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.trackRepository.create({
      ...createTrackDto,
    });
    return await this.trackRepository.save(track);
  }

  async findAll() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async findById(trackId: string) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!track) return;
    return track;
  }

  async findByArtistId(artistId: string) {
    const track = await this.trackRepository.find({
      where: { artistId: artistId },
    });
    if (!track) return;
    return track;
  }

  async findByAlbumId(albumId: string) {
    const track = await this.trackRepository.find({
      where: { albumId: albumId },
    });
    if (!track) return;
    return track;
  }

  async findFavourite() {
    const tracks = await this.trackRepository.find({
      where: {
        isFavourite: true,
      },
    });
    return tracks;
  }

  async addToFavourite(id: string) {
    const track = await this.findById(id);
    if (!track) return;
    const updatedTrack = { ...track, isFavourite: true };
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

  async update(trackId: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!track) return;

    const updatedTrack = {
      id: trackId,
      ...track,
      ...updateTrackDto,
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
}
