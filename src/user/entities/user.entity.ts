import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  version: number;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint' })
  updatedAt: number;
}
