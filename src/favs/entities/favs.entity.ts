import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class FavsEntity {
  @ApiProperty()
  artists: string[];
  @ApiProperty()
  albums: string[];
  @ApiProperty()
  tracks: string[];
}
