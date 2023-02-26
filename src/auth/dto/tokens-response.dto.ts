import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class TokensResponseDto {
  accessToken: string;
  refreshToken: string;
}
