import { Inject, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { IFavsService } from './interfaces/favs.service.interface';
import { FavsStore } from './interfaces/favs.store.interface';

@Injectable()
export class FavsService implements IFavsService {
  constructor(
    @Inject('FavsStore') private readonly favsStore: FavsStore,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  findAll() {
    const favsEntities = this.favsStore.findAll();
    const tracks = this.trackService
      .findAll()
      .filter((track) => favsEntities.tracks.includes(track.id));
    const albums = this.albumService
      .findAll()
      .filter((album) => favsEntities.albums.includes(album.id));
    const artists = this.artistService
      .findAll()
      .filter((artist) => favsEntities.artists.includes(artist.id));
    return { tracks, albums, artists };
  }

  addTrack(id: string) {
    const idAdded = this.favsStore.addTrack(id);
    return idAdded ? `Track ${idAdded} added to Favorites` : undefined;
  }

  addAlbum(id: string) {
    const idAdded = this.favsStore.addAlbum(id);
    return idAdded ? `Album ${idAdded} added to Favorites` : undefined;
  }

  addArtist(id: string) {
    const idAdded = this.favsStore.addArtist(id);
    return idAdded ? `Artist ${idAdded} added to Favorites` : undefined;
  }

  deleteTrack(id: string) {
    const idDeleted = this.favsStore.deleteTrack(id);
    return idDeleted ? `Track ${idDeleted} removed from Favorites` : undefined;
  }

  deleteAlbum(id: string) {
    const idDeleted = this.favsStore.deleteAlbum(id);
    return idDeleted ? `Album ${idDeleted} removed from Favorites` : undefined;
  }

  deleteArtist(id: string) {
    const idDeleted = this.favsStore.deleteArtist(id);
    return idDeleted ? `Artist ${idDeleted} removed from Favorites` : undefined;
  }

  findTrackById(id: string) {
    const favsTrack = this.favsStore.findTrackById(id);
    return favsTrack;
  }

  findAlbumById(id: string) {
    const favsAlbum = this.favsStore.findAlbumById(id);
    return favsAlbum;
  }

  findArtistById(id: string) {
    const favsArtist = this.favsStore.findArtistById(id);
    return favsArtist;
  }
}
