import { Inject, Injectable } from '@nestjs/common';
import { AlbumStore } from 'src/album/interfaces/album.store.interface';
import { ArtistStore } from 'src/artist/interfaces/artist.store.interface';
import { TrackStore } from 'src/track/interfaces/track.store.interface';
import { FavsStore } from '../interfaces/favs.store.interface';

@Injectable()
export class PostgresFavsStorage implements FavsStore {
  constructor(
    @Inject('TrackStore') private readonly trackStore: TrackStore,
    @Inject('AlbumStore') private readonly albumStore: AlbumStore,
    @Inject('ArtistStore') private readonly artistStore: ArtistStore,
  ) {}

  async findAll() {
    const tracks = await this.trackStore.findFavourite();
    const albums = await this.albumStore.findFavourite();
    const artists = await this.artistStore.findFavourite();
    return { tracks, artists, albums };
  }

  async addTrack(id: string) {
    const trackId = await this.trackStore.addToFavourite(id);
    if (!trackId) return;
    return id;
  }

  async addAlbum(id: string) {
    const albumId = await this.albumStore.addToFavourite(id);
    if (!albumId) return;
    return id;
  }

  async addArtist(id: string) {
    const artistId = await this.artistStore.addToFavourite(id);
    if (!artistId) return;
    return id;
  }

  async deleteTrack(id: string) {
    const trackId = await this.trackStore.removeFromFavourite(id);
    if (!trackId) return;
    return id;
  }

  async deleteAlbum(id: string) {
    const albumId = await this.albumStore.removeFromFavourite(id);
    if (!albumId) return;
    return id;
  }

  async deleteArtist(id: string) {
    const artistId = await this.artistStore.removeFromFavourite(id);
    if (!artistId) return;
    return id;
  }
}
