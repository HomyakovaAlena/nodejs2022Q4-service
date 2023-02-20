import { Inject, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { AlbumStore } from 'src/album/interfaces/album.store.interface';
import { ArtistService } from 'src/artist/artist.service';
import { ArtistStore } from 'src/artist/interfaces/artist.store.interface';
import { TrackStore } from 'src/track/interfaces/track.store.interface';
import { TrackService } from 'src/track/track.service';
import { FavsStore } from '../interfaces/favs.store.interface';

@Injectable()
export class PostgresFavsStorage implements FavsStore {
  constructor(
    @Inject('TrackStore') private readonly trackStore: TrackStore,
    @Inject('AlbumStore') private readonly albumStore: AlbumStore,
    @Inject('ArtistStore') private readonly artistStore: ArtistStore,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  async findAll() {
    const tracks = await this.trackService.findFavourite();
    const albums = await this.albumService.findFavourite();
    const artists = await this.artistService.findFavourite();
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
