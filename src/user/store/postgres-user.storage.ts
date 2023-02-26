import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserEntity } from '../entities/user.entity';
import { UserStore } from '../interfaces/user.store.interface';

@Injectable()
export class PostgresUserStorage implements UserStore {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser = this.userRepository.create({
      ...createUserDto,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      version: 1,
    });
    return await this.userRepository.save(createdUser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findById(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return;
    return user;
  }

  async findByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login: login } });
    if (!user) return;
    return user;
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return;

    const updatedUser = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: new Date().getTime(),
    };
    return await this.userRepository.save(updatedUser);
  }

  async delete(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user ? await this.userRepository.remove(user) : undefined;
  }
}
