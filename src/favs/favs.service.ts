import { Inject, Injectable } from '@nestjs/common';
import { IFavsService } from './interfaces/favs.service.interface';
import { FavsStore } from './interfaces/favs.store.interface';

@Injectable()
export class FavsService implements IFavsService {
  constructor(@Inject('FavsStore') private readonly favsStore: FavsStore) {}

  async findAll() {
    const favsEntities = await this.favsStore.findAll();
    return favsEntities;
  }

  async addTrack(id: string) {
    const idAdded = await this.favsStore.addTrack(id);
    return idAdded ? `Track ${idAdded} added to Favorites` : undefined;
  }

  async addAlbum(id: string) {
    const idAdded = await this.favsStore.addAlbum(id);
    return idAdded ? `Album ${idAdded} added to Favorites` : undefined;
  }

  async addArtist(id: string) {
    const idAdded = await this.favsStore.addArtist(id);
    return idAdded ? `Artist ${idAdded} added to Favorites` : undefined;
  }

  async deleteTrack(id: string) {
    const idDeleted = await this.favsStore.deleteTrack(id);
    return idDeleted ? `Track ${idDeleted} removed from Favorites` : undefined;
  }

  async deleteAlbum(id: string) {
    const idDeleted = await this.favsStore.deleteAlbum(id);
    return idDeleted ? `Album ${idDeleted} removed from Favorites` : undefined;
  }

  async deleteArtist(id: string) {
    const idDeleted = await this.favsStore.deleteArtist(id);
    return idDeleted ? `Artist ${idDeleted} removed from Favorites` : undefined;
  }
}
