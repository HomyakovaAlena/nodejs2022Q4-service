import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './interfaces/auth.service.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserStore } from 'src/user/interfaces/user.store.interface';
import { RefreshDto } from './dto/refresh.dto';
import { JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('UserStore') private readonly userStore: UserStore,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await this.hashPassword(password);
    const hashedDto = {
      ...createUserDto,
      password: hashedPassword,
    };
    const userEntity = await this.userStore.create(hashedDto);
    return userEntity;
  }

  async login(id: string, createUserDto: CreateUserDto) {
    const payload = { login: createUserDto.login, userId: id };
    return {
      accessToken: await this.getAccessToken(payload),
      refreshToken: await this.getRefreshToken(payload),
    };
  }

  async refresh(decodedRefreshDto: JwtPayload) {
    const payload = {
      login: decodedRefreshDto.login,
      userId: decodedRefreshDto.userId,
    };
    return {
      accessToken: await this.getAccessToken(payload),
      refreshToken: await this.getRefreshToken(payload),
    };
  }

  async validateUser(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const userEntity = await this.userStore.findByLogin(login);

    if (!userEntity) {
      return {
        user: undefined,
        isValidPassword: false,
      };
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      userEntity?.password,
    );

    if (isMatchPassword) {
      return {
        user: userEntity,
        isValidPassword: true,
      };
    } else {
      return {
        user: userEntity,
        isValidPassword: false,
      };
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private async getAccessToken(payload: JwtPayload) {
    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    return accessToken;
  }

  private async getRefreshToken(payload: JwtPayload) {
    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    return refreshToken;
  }

  async verifyRefreshToken(refreshDto: RefreshDto) {
    try {
      const decodedRefreshToken = this.jwtService.verify(
        refreshDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );
      return decodedRefreshToken;
    } catch (err) {
      return false;
    }
  }
}
