import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favs')
export class FavsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ArtistEntity, (artist) => artist.favs, {
    nullable: true,
  })
  artists: ArtistEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.favs, {
    nullable: true,
  })
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.favs, {
    nullable: true,
  })
  tracks: TrackEntity[];
}
