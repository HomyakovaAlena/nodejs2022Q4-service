import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { TrackStore } from 'src/track/interfaces/track.store.interface';
import { IsNull, Not, Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumStore } from '../interfaces/album.store.interface';

@Injectable()
export class PostgresAlbumStorage implements AlbumStore {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @Inject('TrackStore') private readonly trackStore: TrackStore,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.albumRepository.create({
      ...createAlbumDto,
      id: uuidv4(),
      favs: null,
    });
    return await this.albumRepository.save(album);
  }

  async findAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findById(albumId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) return;
    return album;
  }

  async findFavourite() {
    const albums = await this.albumRepository.find({
      where: { favs: !IsNull() },
    });
    return albums;
  }

  async removeFromFavourite(id: string) {
    const album = await this.findById(id);
    const { favs, ...rest } = album;
    const updatedAlbum = {
      ...rest,
      favs: null,
    };
    await this.albumRepository.update(id, updatedAlbum);
    return updatedAlbum;
  }

  async update(albumId: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) return;
    const updatedAlbum = {
      id: albumId,
      ...updateAlbumDto,
    };
    await this.albumRepository.update(albumId, updateAlbumDto);
    return updatedAlbum;
  }

  async delete(albumId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) return;
    const tracksOfAlbum = await this.trackStore.findByAlbumId(albumId);
    for (const track of tracksOfAlbum) {
      const { albumId, ...rest } = track;
      await this.trackStore.update(track.id, { ...rest, albumId: null });
    }
    return await this.albumRepository.remove(album);
  }
}
