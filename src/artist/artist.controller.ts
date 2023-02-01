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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistNotFoundError } from './errors/artist-not-found.error';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.findById(id);
    if (!artist) {
      throw new ArtistNotFoundError();
    } else {
      return this.artistService.findById(id);
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = this.artistService.findById(id);
    if (!artist) {
      throw new ArtistNotFoundError();
    } else {
      return this.artistService.update(id, updateArtistDto);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.findById(id);
    if (!artist) {
      throw new ArtistNotFoundError();
    } else {
      return this.artistService.delete(id);
    }
  }
}
