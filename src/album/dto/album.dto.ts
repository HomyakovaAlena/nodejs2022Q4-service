import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class AlbumDto {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
