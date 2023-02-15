import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavsEntity } from 'src/favs/entities/favs.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => FavsEntity, (favs) => favs.albums, {
    nullable: true,
  })
  favs?: FavsEntity | null;
}
