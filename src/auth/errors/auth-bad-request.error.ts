import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthBadRequestError extends HttpException {
  constructor() {
    super('DTO is invalid', HttpStatus.BAD_REQUEST);
  }
}
