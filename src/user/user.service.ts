/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './interfaces/user.service.interface';
import { UserStore } from './interfaces/user.store.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('UserStore') private readonly userStore: UserStore) {}

  findAll() {
    const userEntities = this.userStore.findAll();
    return userEntities.map((userEntity) =>
      this._convertEntityToDto(userEntity),
    );
  }

  findById(id: string) {
    const userEntity = this.userStore.findById(id);
    return this._convertEntityToDto(userEntity);
  }

  create(createUserDto: CreateUserDto) {
    const userEntity = this.userStore.create(createUserDto);
    return this._convertEntityToDto(userEntity);
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userEntity = this.userStore.updatePassword(id, updatePasswordDto);
    return this._convertEntityToDto(userEntity);
  }

  delete(id: string) {
    this.userStore.delete(id);
  }

  validateUser(id: string, password: string) {
    const userEntity = this.userStore.findById(id);
    if (userEntity && userEntity.password === password) {
      return {
        user: this._convertEntityToDto(userEntity),
        isValidPassword: true,
      };
    } else if (userEntity && userEntity.password !== password) {
      return {
        user: this._convertEntityToDto(userEntity),
        isValidPassword: false,
      };
    }
    return {
      user: undefined,
      isValidPassword: false,
    };
  }

  private _convertEntityToDto(userEntity: UserEntity) {
    if (userEntity) {
      const { password, ...userResponse } = userEntity;
      return userResponse;
    }
    return undefined;
  }
}
