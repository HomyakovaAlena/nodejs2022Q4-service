/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrackService } from './interfaces/track.service.interface';
import { TrackStore } from './interfaces/track.store.interface';

@Injectable()
export class TrackService implements ITrackService {
  constructor(@Inject('TrackStore') private readonly trackStore: TrackStore) {}

  findAll() {
    const trackEntities = this.trackStore.findAll();
    return trackEntities;
  }

  findById(id: string) {
    const trackEntity = this.trackStore.findById(id);
    return trackEntity;
  }

  create(createTrackDto: CreateTrackDto) {
    const trackEntity = this.trackStore.create(createTrackDto);
    return trackEntity;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackEntity = this.trackStore.update(id, updateTrackDto);
    return trackEntity;
  }

  delete(id: string) {
    this.trackStore.delete(id);
  }
}
