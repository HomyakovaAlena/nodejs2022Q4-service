import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackEntity } from '../entities/track.entity';
import { TrackStore } from '../interfaces/track.store.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class InMemoryTrackStorage implements TrackStore {
  private tracks: TrackEntity[];

  constructor() {
    this.tracks = [];
  }

  findAll() {
    return this.tracks;
  }

  findById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  create(createTrackDto: CreateTrackDto) {
    const track = {
      ...createTrackDto,
      id: uuidv4(),
    };
    this.tracks.push(track);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findById(id);
    if (!track) return undefined;
    this.tracks = this.tracks.filter((track) => track.id !== id);
    const trackEntity = { id, ...updateTrackDto };
    this.tracks.push(trackEntity);
    return trackEntity;
  }

  delete(id: string) {
    const track = this.findById(id);
    if (!track) return undefined;
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
