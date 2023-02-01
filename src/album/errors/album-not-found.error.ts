import { HttpException, HttpStatus } from '@nestjs/common';

export class AlbumNotFoundError extends HttpException {
  constructor() {
    super('Album Not Found', HttpStatus.NOT_FOUND);
  }
}
