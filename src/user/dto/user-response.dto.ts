import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class UserResponseDto extends PartialType(UserDto) {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
