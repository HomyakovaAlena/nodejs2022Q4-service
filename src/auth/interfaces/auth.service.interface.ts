import { JwtPayload } from 'jsonwebtoken';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { RefreshDto } from '../dto/refresh.dto';
import { TokensResponseDto } from '../dto/tokens-response.dto';

export interface IAuthService {
  signup: (createUserDto: CreateUserDto) => Promise<UserEntity>;
  login: (
    id: string,
    createUserDto: CreateUserDto,
  ) => Promise<TokensResponseDto>;
  refresh: (refreshDto: JwtPayload) => Promise<TokensResponseDto>;
}
