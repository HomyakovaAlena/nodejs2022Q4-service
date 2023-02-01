import { UserResponseDto } from '../dto/user-response.dto';

export interface PasswordValidation {
  user: UserResponseDto | undefined;
  isValidPassword: boolean;
}
