import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserEntity } from '../entities/user.entity';

export interface UserStore {
  findAll: () => Promise<UserEntity[]>;
  findById: (id: string) => Promise<UserEntity> | undefined;
  findByLogin: (login: string) => Promise<UserEntity> | undefined;
  create: (createUserDto: CreateUserDto) => Promise<UserEntity>;
  updatePassword: (
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ) => Promise<UserEntity> | undefined;
  delete: (id: string) => void;
}
