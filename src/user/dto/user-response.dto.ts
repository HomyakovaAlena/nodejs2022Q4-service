import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class UserResponseDto extends PartialType(UserDto) {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
