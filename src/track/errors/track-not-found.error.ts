import { HttpException, HttpStatus } from '@nestjs/common';

export class TrackNotFoundError extends HttpException {
  constructor() {
    super('Track Not Found', HttpStatus.NOT_FOUND);
  }
}
