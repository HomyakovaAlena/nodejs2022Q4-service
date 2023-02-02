import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  artistId: string;
  albumId: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
