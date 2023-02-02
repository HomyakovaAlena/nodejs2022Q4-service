import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class TrackEntity {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
