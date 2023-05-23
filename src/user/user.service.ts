import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './interfaces/user.service.interface';
import { UserStore } from './interfaces/user.store.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('UserStore') private readonly userStore: UserStore) {}

  async findAll() {
    const userEntities = await this.userStore.findAll();
    return userEntities;
  }

  async findById(id: string) {
    const userEntity = await this.userStore.findById(id);
    return userEntity;
  }

  async create(createUserDto: CreateUserDto) {
    const userEntity = await this.userStore.create(createUserDto);
    return userEntity;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userEntity = await this.userStore.updatePassword(
      id,
      updatePasswordDto,
    );
    return this.convertEntityToDto(userEntity);
  }

  async delete(id: string) {
    await this.userStore.delete(id);
  }

  async validateUser(userId: string, password: string) {
    const userEntity = await this.userStore.findById(userId);
    if (userEntity && userEntity.password === password) {
      return {
        user: userEntity,
        isValidPassword: true,
      };
    } else if (userEntity && userEntity.password !== password) {
      return {
        user: userEntity,
        isValidPassword: false,
      };
    }
    return {
      user: undefined,
      isValidPassword: false,
    };
  }

  private convertEntityToDto(userEntity: UserEntity) {
    if (userEntity) {
      const { password, createdAt, updatedAt, ...userResponse } = userEntity;
      return {
        createdAt: Number(createdAt),
        updatedAt: Number(updatedAt),
        ...userResponse,
      };
    }
    return undefined;
  }
}
