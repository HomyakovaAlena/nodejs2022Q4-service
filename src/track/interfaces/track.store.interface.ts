import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

export interface TrackStore {
  findAll: () => Promise<TrackEntity[]>;
  findById: (id: string) => Promise<TrackEntity | undefined>;
  findByArtistId: (id: string) => Promise<TrackEntity[] | undefined>;
  findByAlbumId: (id: string) => Promise<TrackEntity[] | undefined>;
  findFavourite: () => Promise<TrackEntity[]>;
  addToFavourite: (id: string) => Promise<string | undefined>;
  removeFromFavourite: (id: string) => Promise<string | undefined>;
  create: (createTrackDto: CreateTrackDto) => Promise<TrackEntity>;
  update: (id: string, updateTrackDto: UpdateTrackDto) => Promise<TrackEntity>;
  delete: (id: string) => Promise<TrackEntity>;
}
