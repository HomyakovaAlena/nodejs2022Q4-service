import { Module } from '@nestjs/common';
import CustomLoggerMiddleware from './logger.middleware';
import { CustomLoggerService } from './logger.service';

@Module({
  providers: [CustomLoggerService, CustomLoggerMiddleware],
})
export class LoggerModule {}
