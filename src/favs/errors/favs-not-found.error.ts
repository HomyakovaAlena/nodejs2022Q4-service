import { HttpException, HttpStatus } from '@nestjs/common';

export class FavsNotFoundError extends HttpException {
  constructor(id: string) {
    super(`Item ${id} Not Found in Favorites`, HttpStatus.NOT_FOUND);
  }
}
