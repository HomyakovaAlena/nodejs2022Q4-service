import { HttpException, HttpStatus } from '@nestjs/common';

export class ItemUnprocessable extends HttpException {
  constructor(id: string) {
    super(`Item ${id} Not Found`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
