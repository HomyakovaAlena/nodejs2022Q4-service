import * as fs from 'node:fs/promises';
import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import * as os from 'node:os';
import * as dotenv from 'dotenv';
import { logFileConfig, logLevels } from './logger.constants';
dotenv.config();

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  async log(message: any, ...optionalParams: any[]) {
    if (!this.isEnabledLevel('log')) {
      return;
    }
    const customMessage = await this.formatCustomeMessage(message, 'log');
    await this.writeToFile(customMessage, 'log');
    super.log.apply(this, [message, ...optionalParams]);
  }

  async error(message: any, ...optionalParams: any[]) {
    if (!this.isEnabledLevel('error')) {
      return;
    }
    const customMessage = await this.formatCustomeMessage(message, 'error');
    await this.writeToFile(customMessage, 'error');
    super.error.apply(this, [message, ...optionalParams]);
  }

  async warn(message: any, ...optionalParams: any[]) {
    if (!this.isEnabledLevel('warn')) {
      return;
    }
    const customMessage = await this.formatCustomeMessage(message, 'warn');
    await this.writeToFile(customMessage, 'warn');
    super.warn.apply(this, [message, ...optionalParams]);
  }

  async debug(message: any, ...optionalParams: any[]) {
    if (!this.isEnabledLevel('debug')) {
      return;
    }
    const customMessage = await this.formatCustomeMessage(message, 'debug');
    await this.writeToFile(customMessage, 'debug');
    super.debug.apply(this, [message, ...optionalParams]);
  }

  async verbose(message: any, ...optionalParams: any[]) {
    if (!this.isEnabledLevel('verbose')) {
      return;
    }
    const customMessage = await this.formatCustomeMessage(message, 'verbose');
    await this.writeToFile(customMessage, 'verbose');
    super.verbose.apply(this, [message, ...optionalParams]);
  }

  private async writeToFile(message: string, logLevel: LogLevel) {
    try {
      const fileToWrite = logFileConfig[logLevel];
      const msgInLine = message + os.EOL;
      await fs.writeFile(fileToWrite, msgInLine, { flag: 'a' });
    } catch (error) {
      console.log(error);
      throw new Error('Server logger operation failed');
    }
  }

  private async isEnabledLevel(logLevel: LogLevel) {
    const maxLevel = process.env.LOG_LEVEL;
    return logLevels.slice(+maxLevel).includes(logLevel);
  }

  private async formatCustomeMessage(message: string, logLevel: LogLevel) {
    const timestamp = this.getTimestamp();
    const levelFormatted = logLevel.toUpperCase();
    return `${timestamp}    ${levelFormatted}:    ${message}`;
  }
}
