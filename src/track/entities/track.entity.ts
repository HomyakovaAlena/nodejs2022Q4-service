import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId?: string | null;

  @Column({ nullable: true })
  albumId?: string | null;

  @Column()
  duration: number;

  @Column('boolean', { default: false })
  @Exclude()
  isFavourite = false;
}
