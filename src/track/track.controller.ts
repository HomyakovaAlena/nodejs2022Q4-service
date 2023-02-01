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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackNotFoundError } from './errors/track-not-found.error';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.findById(id);
    if (!track) {
      throw new TrackNotFoundError();
    } else {
      return this.trackService.findById(id);
    }
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = this.trackService.findById(id);
    if (!track) {
      throw new TrackNotFoundError();
    } else {
      return this.trackService.update(id, updateTrackDto);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.findById(id);
    if (!track) {
      throw new TrackNotFoundError();
    } else {
      return this.trackService.delete(id);
    }
  }
}
