import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class RefreshDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
