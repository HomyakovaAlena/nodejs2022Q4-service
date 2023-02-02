import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbumService } from './interfaces/album.service.interface';
import { AlbumStore } from './interfaces/album.store.interface';

@Injectable()
export class AlbumService implements IAlbumService {
  constructor(@Inject('AlbumStore') private readonly albumStore: AlbumStore) {}

  findAll() {
    const albumEntities = this.albumStore.findAll();
    return albumEntities;
  }

  findById(id: string) {
    const albumEntity = this.albumStore.findById(id);
    return albumEntity;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const albumEntity = this.albumStore.create(createAlbumDto);
    return albumEntity;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumEntity = this.albumStore.update(id, updateAlbumDto);
    return albumEntity;
  }

  delete(id: string) {
    this.albumStore.delete(id);
  }
}
