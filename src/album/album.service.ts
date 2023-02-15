import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbumService } from './interfaces/album.service.interface';
import { AlbumStore } from './interfaces/album.store.interface';

@Injectable()
export class AlbumService implements IAlbumService {
  constructor(@Inject('AlbumStore') private readonly albumStore: AlbumStore) {}

  async findAll() {
    const albumEntities = await this.albumStore.findAll();
    return albumEntities;
  }

  async findById(id: string) {
    const albumEntity = await this.albumStore.findById(id);
    return albumEntity;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const albumEntity = await this.albumStore.create(createAlbumDto);
    return albumEntity;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumEntity = await this.albumStore.update(id, updateAlbumDto);
    return albumEntity;
  }

  async delete(id: string) {
    return await this.albumStore.delete(id);
  }
}
