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
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistNotFoundError } from './errors/artist-not-found.error';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Artist')
@Controller('artist')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all records.',
  })
  async findAll() {
    return await this.artistService.findAll();
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
    const artist = await this.artistService.findById(id);
    if (!artist) {
      throw new ArtistNotFoundError();
    } else {
      return artist;
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
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistService.findById(id);
    if (!artist) {
      throw new ArtistNotFoundError();
    } else {
      return await this.artistService.update(id, updateArtistDto);
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
    const artist = await this.artistService.findById(id);
    if (!artist) {
      throw new ArtistNotFoundError();
    } else {
      return await this.artistService.delete(id);
    }
  }
}
