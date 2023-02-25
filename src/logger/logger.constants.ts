import { LogLevel } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

export const logFileConfig = {
  error: process.env.PATH_TO_ERROR_LOGS,
  debug: process.env.PATH_TO_COMMON_LOGS,
  verbose: process.env.PATH_TO_COMMON_LOGS,
  warn: process.env.PATH_TO_COMMON_LOGS,
  log: process.env.PATH_TO_COMMON_LOGS,
};

export const logLevels: LogLevel[] = [
  'error',
  'warn',
  'log',
  'debug',
  'verbose',
];
