import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsNotFoundError } from './errors/favs-not-found.error';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { ItemUnprocessable } from './errors/item-unprocessable.error';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.findById(id);
    if (!track) {
      throw new ItemUnprocessable(id);
    }
    return this.favsService.addTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.findById(id);
    if (!album) {
      throw new ItemUnprocessable(id);
    }
    return this.favsService.addAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.findById(id);
    if (!artist) {
      throw new ItemUnprocessable(id);
    }
    return this.favsService.addArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const favs = this.favsService.deleteTrack(id);
    if (!favs) {
      throw new FavsNotFoundError(id);
    } else {
      return favs;
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const favs = this.favsService.deleteAlbum(id);
    if (!favs) {
      throw new FavsNotFoundError(id);
    } else {
      return favs;
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const favs = this.favsService.deleteArtist(id);
    if (!favs) {
      throw new FavsNotFoundError(id);
    } else {
      return favs;
    }
  }
}
