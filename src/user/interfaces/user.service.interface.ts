import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserEntity } from '../entities/user.entity';
import { PasswordValidation } from './password-validation.interface';

export interface IUserService {
  findAll: () => Promise<UserEntity[]>;
  findById: (id: string) => Promise<UserEntity> | undefined;
  create: (createUserDto: CreateUserDto) => Promise<UserEntity>;
  updatePassword: (
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ) => Promise<UserResponseDto> | undefined;
  delete: (id: string) => void;
  validateUser: (id: string, password: string) => Promise<PasswordValidation>;
}
