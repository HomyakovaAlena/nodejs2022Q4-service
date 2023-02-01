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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UserForbiddenError } from './errors/user-forbidden.error copy';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.usersService.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    } else {
      return this.usersService.findById(id);
    }
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { user, isValidPassword } = this.usersService.validateUser(
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
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.usersService.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    } else {
      return this.usersService.delete(id);
    }
  }
}
