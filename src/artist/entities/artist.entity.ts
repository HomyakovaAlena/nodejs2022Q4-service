import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { FavsEntity } from 'src/favs/entities/favs.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @ManyToOne(() => FavsEntity, (favs) => favs.artists, {
    nullable: true,
  })
  favs?: FavsEntity | null;
}
