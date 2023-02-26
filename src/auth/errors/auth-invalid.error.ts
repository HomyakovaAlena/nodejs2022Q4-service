import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthInvalidError extends HttpException {
  constructor() {
    super('Request is invalid', HttpStatus.UNAUTHORIZED);
  }
}
