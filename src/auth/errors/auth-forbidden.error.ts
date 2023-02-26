import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthForbiddenError extends HttpException {
  constructor() {
    super('Authentication failed', HttpStatus.FORBIDDEN);
  }
}
