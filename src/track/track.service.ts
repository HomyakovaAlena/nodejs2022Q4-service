import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrackService } from './interfaces/track.service.interface';
import { TrackStore } from './interfaces/track.store.interface';

@Injectable()
export class TrackService implements ITrackService {
  constructor(@Inject('TrackStore') private readonly trackStore: TrackStore) {}

  async findAll() {
    const trackEntities = await this.trackStore.findAll();
    return trackEntities;
  }

  async findById(id: string) {
    const trackEntity = await this.trackStore.findById(id);
    return trackEntity;
  }

  async create(createTrackDto: CreateTrackDto) {
    const trackEntity = await this.trackStore.create(createTrackDto);
    return trackEntity;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackEntity = await this.trackStore.update(id, updateTrackDto);
    return trackEntity;
  }

  async delete(id: string) {
    return await this.trackStore.delete(id);
  }
}
