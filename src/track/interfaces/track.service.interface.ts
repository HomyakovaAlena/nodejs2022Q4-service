import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackResponseDto } from '../dto/track-response.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

export interface ITrackService {
  findAll: () => TrackResponseDto[];
  findById: (id: string) => TrackResponseDto | undefined;
  create: (createTrackDto: CreateTrackDto) => TrackResponseDto;
  update: (id: string, updateTrackDto: UpdateTrackDto) => TrackResponseDto;
  delete: (id: string) => void;
}
