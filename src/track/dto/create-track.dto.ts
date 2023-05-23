import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  artistId?: string | null;
  albumId?: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
