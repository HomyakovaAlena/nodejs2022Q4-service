import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class UserDto {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
