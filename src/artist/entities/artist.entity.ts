import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;
}
