import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { FavsEntity } from 'src/favs/entities/favs.entity';
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

  @ManyToOne(() => FavsEntity, (favs) => favs.tracks, {
    nullable: true,
  })
  favs?: FavsEntity | null;
}
