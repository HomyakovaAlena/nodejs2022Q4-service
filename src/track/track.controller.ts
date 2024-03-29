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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackNotFoundError } from './errors/track-not-found.error';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Track')
@Controller('track')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all records.',
  })
  async findAll() {
    return await this.trackService.findAll();
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
    const track = await this.trackService.findById(id);
    if (!track) {
      throw new TrackNotFoundError();
    } else {
      return track;
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
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.trackService.findById(id);
    if (!track) {
      throw new TrackNotFoundError();
    } else {
      return await this.trackService.update(id, updateTrackDto);
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
    const track = await this.trackService.findById(id);
    if (!track) {
      throw new TrackNotFoundError();
    } else {
      return await this.trackService.delete(id);
    }
  }
}
