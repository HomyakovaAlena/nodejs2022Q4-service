import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist?: ArtistEntity | null;

  @Column('boolean', { default: false })
  @Exclude()
  isFavourite = false;
}
