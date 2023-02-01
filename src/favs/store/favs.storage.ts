import { Injectable } from '@nestjs/common';
import { FavsEntity } from '../entities/favs.entity';
import { FavsStore } from '../interfaces/favs.store.interface';

@Injectable()
export class InMemoryFavsStorage implements FavsStore {
  private favs: FavsEntity = new FavsEntity();

  constructor() {
    this.favs.tracks = [];
    this.favs.albums = [];
    this.favs.artists = [];
  }

  findAll() {
    return this.favs;
  }

  addTrack(id: string) {
    this.favs.tracks.push(id);
    return id;
  }

  addAlbum(id: string) {
    this.favs.albums.push(id);
    return id;
  }

  addArtist(id: string) {
    this.favs.artists.push(id);
    return id;
  }

  deleteTrack(id: string) {
    const track = this.findTrackById(id);
    if (!track) return undefined;
    this.favs.tracks = this.favs.tracks.filter((trackId) => trackId !== id);
    return id;
  }

  deleteAlbum(id: string) {
    const album = this.findAlbumById(id);
    if (!album) return undefined;
    this.favs.albums = this.favs.albums.filter((albumId) => albumId !== id);
    return id;
  }

  deleteArtist(id: string) {
    const artist = this.findArtistById(id);
    if (!artist) return undefined;
    this.favs.artists = this.favs.artists.filter((artistId) => artistId !== id);
    return id;
  }

  findTrackById(id: string) {
    return this.favs.tracks.find((trackId) => trackId === id);
  }

  findAlbumById(id: string) {
    return this.favs.albums.find((albumId) => albumId === id);
  }

  findArtistById(id: string) {
    return this.favs.artists.find((artistId) => artistId === id);
  }
}
