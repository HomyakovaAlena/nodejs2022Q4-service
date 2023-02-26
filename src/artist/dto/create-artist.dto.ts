import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
