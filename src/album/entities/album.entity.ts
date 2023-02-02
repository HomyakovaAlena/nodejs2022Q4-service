import { ApiProperty, ApiBody } from '@nestjs/swagger';
export class AlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
