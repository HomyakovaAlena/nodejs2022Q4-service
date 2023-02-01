import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserEntity } from '../entities/user.entity';
import { UserStore } from '../interfaces/user.store.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InMemoryUserStorage implements UserStore {
  private users: UserEntity[];

  constructor() {
    this.users = [];
  }

  findAll() {
    return this.users;
  }

  findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      id: uuidv4(),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      version: 1,
    };
    this.users.push(user);
    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.findById(id);
    if (!user) return undefined;
    const updatedUser = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: new Date().getTime(),
    };

    this.users = this.users.filter((user) => user.id !== id);
    this.users.push(updatedUser);
    return updatedUser;
  }

  delete(id: string) {
    const user = this.findById(id);
    if (!user) return undefined;
    this.users = this.users.filter((user) => user.id !== id);
  }
}
