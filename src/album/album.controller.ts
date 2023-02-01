import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumNotFoundError } from './errors/album-not-found.error';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.findById(id);
    if (!album) {
      throw new AlbumNotFoundError();
    } else {
      return this.albumService.findById(id);
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumService.findById(id);
    if (!album) {
      throw new AlbumNotFoundError();
    } else {
      return this.albumService.update(id, updateAlbumDto);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.findById(id);
    if (!album) {
      throw new AlbumNotFoundError();
    } else {
      return this.albumService.delete(id);
    }
  }
}
