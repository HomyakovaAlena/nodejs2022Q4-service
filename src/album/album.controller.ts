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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all records.',
  })
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get record by id if it exists.',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'The record not found.',
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.findById(id);
    if (!album) {
      throw new AlbumNotFoundError();
    } else {
      return album;
    }
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The record successfully updated.',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'The record not found.',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumService.findById(id);
    if (!album) {
      throw new AlbumNotFoundError();
    } else {
      return await this.albumService.update(id, updateAlbumDto);
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The record successfully deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'The record not found. Record with this id does not exist',
  })
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.findById(id);
    if (!album) {
      throw new AlbumNotFoundError();
    } else {
      return await this.albumService.delete(id);
    }
  }
}
