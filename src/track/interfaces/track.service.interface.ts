import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackResponseDto } from '../dto/track-response.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

export interface ITrackService {
  findAll: () => Promise<TrackResponseDto[]>;
  findById: (id: string) => Promise<TrackResponseDto | undefined>;
  create: (createTrackDto: CreateTrackDto) => Promise<TrackResponseDto>;
  update: (
    id: string,
    updateTrackDto: UpdateTrackDto,
  ) => Promise<TrackResponseDto>;
  delete: (id: string) => Promise<TrackResponseDto>;
  findFavourite: () => Promise<TrackResponseDto[]>;
}
