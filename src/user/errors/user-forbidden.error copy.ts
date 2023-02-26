import { HttpException, HttpStatus } from '@nestjs/common';

export class UserForbiddenError extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
