import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { PasswordValidation } from './password-validation.interface';

export interface IUserService {
  findAll: () => UserResponseDto[];
  findById: (id: string) => UserResponseDto | undefined;
  create: (createUserDto: CreateUserDto) => UserResponseDto;
  updatePassword: (
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ) => UserResponseDto | undefined;
  delete: (id: string) => void;
  validateUser: (id: string, password: string) => PasswordValidation;
}
