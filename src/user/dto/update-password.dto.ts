import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
