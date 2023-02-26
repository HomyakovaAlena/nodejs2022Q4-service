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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UserForbiddenError } from './errors/user-forbidden.error copy';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all records.',
  })
  async findAll() {
    return await this.usersService.findAll();
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
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    } else {
      return user;
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
  @ApiForbiddenResponse({ description: 'Forbidden. Old Password is wrong' })
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { user, isValidPassword } = await this.usersService.validateUser(
      id,
      updatePasswordDto.oldPassword,
    );
    if (!user) {
      throw new UserNotFoundError();
    } else if (!isValidPassword) {
      throw new UserForbiddenError();
    } else {
      return this.usersService.updatePassword(id, updatePasswordDto);
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
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    } else {
      return this.usersService.delete(id);
    }
  }
}
