import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class ArtistDto {
  id: string;
  name: string;
  grammy: boolean;
}
