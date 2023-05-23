import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';
import CustomLoggerMiddleware from './logger.middleware';
import { CustomLoggerService } from './logger.service';

@Module({
  providers: [
    CustomLoggerService,
    CustomLoggerMiddleware,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class LoggerModule {}
