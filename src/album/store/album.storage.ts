import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumStore } from '../interfaces/album.store.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { TrackStore } from 'src/track/interfaces/track.store.interface';

@Injectable()
export class InMemoryAlbumStorage implements AlbumStore {
  private albums: AlbumEntity[];

  constructor(@Inject('TrackStore') private readonly trackStore: TrackStore) {
    this.albums = [];
  }

  findAll() {
    return this.albums;
  }

  findById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      ...createAlbumDto,
      id: uuidv4(),
    };
    this.albums.push(album);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findById(id);
    if (!album) return undefined;
    this.albums = this.albums.filter((album) => album.id !== id);
    const albumEntity = { id, ...updateAlbumDto };
    this.albums.push(albumEntity);
    return albumEntity;
  }

  delete(id: string) {
    const album = this.findById(id);
    if (!album) return undefined;
    this.albums = this.albums.filter((album) => album.id !== id);

    const tracksOfAlbum = this.trackStore.findByAlbumId(id);
    tracksOfAlbum.forEach((track) => {
      const { albumId, ...rest } = track;
      return this.trackStore.update(track.id, { ...rest, albumId: null });
    });
  }
}
