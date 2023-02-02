import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserEntity } from '../entities/user.entity';

export interface UserStore {
  findAll: () => UserEntity[];
  findById: (id: string) => UserEntity | undefined;
  create: (createUserDto: CreateUserDto) => UserEntity;
  updatePassword: (
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ) => UserEntity | undefined;
  delete: (id: string) => void;
}
