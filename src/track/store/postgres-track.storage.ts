import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { IsNull, Not, Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
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
      id: uuidv4(),
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
      relations: {
        favs: true,
      },
    });
    return tracks;
  }

  async removeFromFavourite(id: string) {
    const track = await this.findById(id);
    const { favs, ...rest } = track;
    const updatedTrack = {
      ...rest,
      favs: null,
    };
    return await this.trackRepository.save(updatedTrack);
  }

  async update(trackId: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!track) return;

    const updatedTrack = {
      id: trackId,
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
