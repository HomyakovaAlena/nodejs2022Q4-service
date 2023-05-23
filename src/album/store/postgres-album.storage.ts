import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ArtistStore } from 'src/artist/interfaces/artist.store.interface';
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
    @Inject(forwardRef(() => 'TrackStore'))
    private readonly trackStore: TrackStore,
    @Inject(forwardRef(() => 'ArtistStore'))
    private readonly artistStore: ArtistStore,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const { artistId, ...rest } = createAlbumDto;
    const artistEntity = artistId
      ? await this.artistStore.findById(artistId)
      : null;
    const album = await this.albumRepository.create({
      ...rest,
      artist: artistEntity,
    });
    return await this.albumRepository.save(album);
  }

  async findAll() {
    const albums = await this.albumRepository.find({
      relations: {
        artist: true,
      },
    });
    return albums;
  }

  async findById(albumId: string) {
    const album = await this.albumRepository.findOne({
      relations: {
        artist: true,
      },
      where: { id: albumId },
    });
    if (!album) return;
    return album;
  }

  async update(albumId: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) return;

    const { artistId, ...rest } = updateAlbumDto;
    const artistEntity = artistId
      ? await this.artistStore.findById(artistId)
      : null;
    const updatedAlbum = {
      id: albumId,
      ...album,
      ...rest,
      artist: artistEntity,
    };
    await this.albumRepository.save(updateAlbumDto);
    return updatedAlbum;
  }

  async delete(albumId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) return;
    const tracksOfAlbum = await this.trackStore.findByAlbumId(albumId);
    for (const track of tracksOfAlbum) {
      const { album, ...rest } = track;
      await this.trackStore.update(track.id, { ...rest, albumId: null });
    }
    await this.albumRepository.remove(album);
    return albumId;
  }

  async findFavourite() {
    const albums = await this.albumRepository.find({
      relations: {
        artist: true,
      },
      where: {
        isFavourite: true,
      },
    });
    return albums;
  }

  async addToFavourite(id: string) {
    const album = await this.findById(id);
    if (!album) return;
    const updatedAlbum = { ...album, isFavourite: true, id };
    await this.albumRepository.save(updatedAlbum);
    return id;
  }

  async removeFromFavourite(id: string) {
    const album = await this.findById(id);
    if (!album) return;
    const updatedAlbum = { ...album, isFavourite: false };
    await this.albumRepository.save(updatedAlbum);
    return id;
  }
}
