import { Controller, Post, Body, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthForbiddenError } from './errors/auth-forbidden.error';
import { AuthInvalidError } from './errors/auth-invalid.error';
import { BadRequestExceptionFilter } from './exception-filters/400-exception.filter';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Request is invalid',
  })
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login successful',
  })
  @ApiBadRequestResponse({
    description: 'Request is invalid',
  })
  @ApiResponse({
    status: 403,
    description: 'Authentication failed',
  })
  async login(@Body() createUserDto: CreateUserDto) {
    const { user, isValidPassword } = await this.authService.validateUser(
      createUserDto,
    );
    if (!user || !isValidPassword) {
      throw new AuthForbiddenError();
    } else {
      return await this.authService.login(user.id, createUserDto);
    }
  }

  @Post('refresh')
  @UseFilters(BadRequestExceptionFilter)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description:
      'Operation of getting new pair of Access token and Refresh token is succesful',
  })
  @ApiResponse({
    status: 401,
    description: 'No Refresh token in body',
  })
  @ApiResponse({
    status: 403,
    description: 'Authentication failed',
  })
  async refresh(@Body() refreshDto: RefreshDto) {
    if (!refreshDto || !Object.keys(refreshDto).length) {
      throw new AuthInvalidError();
    }
    const decoded = await this.authService.verifyRefreshToken(refreshDto);
    if (!decoded) {
      throw new AuthForbiddenError();
    }
    return await this.authService.refresh(decoded);
  }
}
