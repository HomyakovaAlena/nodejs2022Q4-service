import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

export interface TrackStore {
  findAll: () => TrackEntity[];
  findById: (id: string) => TrackEntity | undefined;
  findByArtistId: (id: string) => TrackEntity[] | undefined;
  create: (createTrackDto: CreateTrackDto) => TrackEntity;
  update: (id: string, updateTrackDto: UpdateTrackDto) => TrackEntity;
  delete: (id: string) => void;
}
