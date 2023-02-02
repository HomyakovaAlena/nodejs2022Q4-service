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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FavsResponseDto } from './dto/favs-response.dto';

@ApiTags('Favs')
@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description:
      'Get all records (all favorite records (not their ids), split by entity type).',
  })
  findAll(): FavsResponseDto {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @ApiCreatedResponse({
    description: 'The record has been successfully added to favorites.',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Record with this id does not exist.',
  })
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.findById(id);
    if (!track) {
      throw new ItemUnprocessable(id);
    }
    return this.favsService.addTrack(id);
  }

  @Post('album/:id')
  @ApiCreatedResponse({
    description: 'The record has been successfully added to favorites.',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Record with this id does not exist.',
  })
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.findById(id);
    if (!album) {
      throw new ItemUnprocessable(id);
    }
    return this.favsService.addAlbum(id);
  }

  @Post('artist/:id')
  @ApiCreatedResponse({
    description: 'The record has been successfully added to favorites.',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Record with this id does not exist.',
  })
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.findById(id);
    if (!artist) {
      throw new ItemUnprocessable(id);
    }
    return this.favsService.addArtist(id);
  }

  @Delete('track/:id')
  @ApiResponse({
    status: 204,
    description: 'The record successfully removed from favorites.',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Corresponding record is not in favorites.',
  })
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
  @ApiResponse({
    status: 204,
    description: 'The record successfully removed from favorites.',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Corresponding record is not in favorites.',
  })
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
  @ApiResponse({
    status: 204,
    description: 'The record successfully removed from favorites.',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Corresponding record is not in favorites.',
  })
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
