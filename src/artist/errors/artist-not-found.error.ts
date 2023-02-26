import { HttpException, HttpStatus } from '@nestjs/common';

export class ArtistNotFoundError extends HttpException {
  constructor() {
    super('Artist Not Found', HttpStatus.NOT_FOUND);
  }
}
