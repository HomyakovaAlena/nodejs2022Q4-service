import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist?: ArtistEntity | null;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album?: AlbumEntity | null;

  @Column()
  duration: number;

  @Column('boolean', { default: false })
  @Exclude()
  isFavourite = false;
}
