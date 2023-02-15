import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { ITrackService } from './interfaces/track.service.interface';
import { TrackStore } from './interfaces/track.store.interface';

@Injectable()
export class TrackService implements ITrackService {
  constructor(@Inject('TrackStore') private readonly trackStore: TrackStore) {}

  async findAll() {
    const trackEntities = await this.trackStore.findAll();
    return trackEntities.map((track) => this.convertEntityToDto(track));
  }

  async findById(id: string) {
    const trackEntity = await this.trackStore.findById(id);
    return trackEntity ? this.convertEntityToDto(trackEntity) : undefined;
  }

  async create(createTrackDto: CreateTrackDto) {
    const trackEntity = await this.trackStore.create(createTrackDto);
    return this.convertEntityToDto(trackEntity);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackEntity = await this.trackStore.update(id, updateTrackDto);
    return trackEntity ? this.convertEntityToDto(trackEntity) : undefined;
  }

  async delete(id: string) {
    return await this.trackStore.delete(id);
  }

  async findFavourite() {
    const tracks = await this.trackStore.findFavourite();
    return tracks.map((track) => this.convertEntityToDto(track));
  }

  private convertEntityToDto(trackWithRelations: TrackEntity) {
    const { id, name, duration, artist, album } = trackWithRelations;
    return {
      id,
      name,
      artistId: artist ? artist?.id : null,
      albumId: album ? album?.id : null,
      duration,
    };
  }
}
