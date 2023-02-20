import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { IAlbumService } from './interfaces/album.service.interface';
import { AlbumStore } from './interfaces/album.store.interface';

@Injectable()
export class AlbumService implements IAlbumService {
  constructor(@Inject('AlbumStore') private readonly albumStore: AlbumStore) {}

  async findAll() {
    const albumEntities = await this.albumStore.findAll();
    return albumEntities.map((album) => this.convertEntityToDto(album));
  }

  async findById(id: string) {
    const albumEntity = await this.albumStore.findById(id);
    return albumEntity ? this.convertEntityToDto(albumEntity) : undefined;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const albumEntity = await this.albumStore.create(createAlbumDto);
    return this.convertEntityToDto(albumEntity);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumEntity = await this.albumStore.update(id, updateAlbumDto);
    return albumEntity ? this.convertEntityToDto(albumEntity) : undefined;
  }

  async delete(id: string) {
    return await this.albumStore.delete(id);
  }

  async findFavourite() {
    const albums = await this.albumStore.findFavourite();
    return albums.map((album) => this.convertEntityToDto(album));
  }

  private convertEntityToDto(albumWithRelations: AlbumEntity) {
    const { id, name, year, artist } = albumWithRelations;
    return {
      id,
      name,
      year,
      artistId: artist ? artist?.id : null,
    };
  }
}
