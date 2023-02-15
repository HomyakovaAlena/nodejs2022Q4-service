import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { AlbumStore } from 'src/album/interfaces/album.store.interface';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { ArtistStore } from 'src/artist/interfaces/artist.store.interface';
import { TrackEntity } from 'src/track/entities/track.entity';
import { TrackStore } from 'src/track/interfaces/track.store.interface';
import { IsNull, Not, Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import { FavsEntity } from '../entities/favs.entity';
import { FavsStore } from '../interfaces/favs.store.interface';

@Injectable()
export class PostgresFavsStorage implements FavsStore {
  constructor(
    @InjectRepository(FavsEntity)
    private favsRepository: Repository<FavsEntity>,
    @Inject('TrackStore') private readonly trackStore: TrackStore,
    @Inject('AlbumStore') private readonly albumStore: AlbumStore,
    @Inject('ArtistStore') private readonly artistStore: ArtistStore,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async findAll() {
    const tracks = await this.trackStore.findFavourite();
    const albums = await this.albumStore.findFavourite();
    const artists = await this.artistStore.findFavourite();
    return { tracks, artists, albums };
  }

  async getFavsId() {
    return (await this.favsRepository.find())[0];
  }

  async addTrack(id: string) {
    const track = await this.trackStore.findById(id);
    const favs = await this.getFavsId();
    const updatedTrack = { ...track, favs: favs };
    await this.trackRepository.save(updatedTrack);
    return id;
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOne({
      where: { id: id },
    });
    const favs = await this.getFavsId();
    const updatedAlbum = { ...album, favs: favs };
    await this.albumRepository.save(updatedAlbum);
    return id;
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOne({
      where: { id: id },
    });
    const favs = await this.getFavsId();
    const updatedArtist = { ...artist, favs: favs };
    await this.artistRepository.save(updatedArtist);
    return id;
  }

  async deleteTrack(id: string) {
    const track = await this.trackStore.removeFromFavourite(id);
    if (!track) return;
    return id;
  }

  async deleteAlbum(id: string) {
    const album = await this.albumStore.removeFromFavourite(id);
    if (!album) return;
    return id;
  }

  async deleteArtist(id: string) {
    const artist = await this.artistStore.removeFromFavourite(id);
    if (!artist) return;
    return id;
  }
}
