import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { TrackStore } from 'src/track/interfaces/track.store.interface';
import { Repository } from 'typeorm';
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
    const tracks = await this.albumRepository.find({
      where: {
        isFavourite: true,
      },
    });
    return tracks;
  }

  async addToFavourite(id: string) {
    const album = await this.findById(id);
    if (!album) return;
    const updatedAlbum = { ...album, isFavourite: true };
    await this.albumRepository.update(album.id, updatedAlbum);
    return id;
  }

  async removeFromFavourite(id: string) {
    const album = await this.findById(id);
    if (!album) return;
    const updatedAlbum = { ...album, isFavourite: false };
    await this.albumRepository.update(album.id, updatedAlbum);
    return id;
  }

  async update(albumId: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) return;
    const updatedAlbum = {
      id: albumId,
      ...album,
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
