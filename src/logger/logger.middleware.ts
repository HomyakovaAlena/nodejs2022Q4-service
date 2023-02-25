import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from './logger.service';

@Injectable()
class CustomLoggerMiddleware implements NestMiddleware {
  //   private readonly logger = new Logger('HTTP');
  constructor(private customLoggerService: CustomLoggerService) {}

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl, body, params, query } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} 
      ${JSON.stringify({ body })} ${JSON.stringify({
        params,
      })} ${JSON.stringify({
        query,
      })} ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        return this.customLoggerService.error(message);
      }

      if (statusCode >= 400) {
        return this.customLoggerService.warn(message);
      }
      return this.customLoggerService.log(message);
    });

    next();
  }
}

export default CustomLoggerMiddleware;
