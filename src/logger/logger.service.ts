import * as fs from 'node:fs/promises';
import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as os from 'node:os';
import { stat } from 'fs/promises';
import * as path from 'path';
import { readdir } from 'node:fs/promises';
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
      const fileWithLastTimeStamp = await this.getLastLogFileOfLevel(logLevel);
      const msgInLine = message + os.EOL;
      let fileToWriteResolved;
      if (!fileWithLastTimeStamp) {
        fileToWriteResolved = await this.createNewFileForLogLevel(logLevel);
      } else {
        const fileToWrite = `${process.env.PATH_TO_LOGS}${fileWithLastTimeStamp}`;
        fileToWriteResolved = path.resolve(fileToWrite);
        const filesize = await this.getFileSize(fileToWriteResolved);
        const messageByteSize = new Blob([msgInLine]).size;

        if (
          filesize + messageByteSize >
          Number(process.env.MAX_FILE_SIZE_IN_BYTES)
        ) {
          fileToWriteResolved = await this.createNewFileForLogLevel(logLevel);
        }
      }
      await fs.writeFile(fileToWriteResolved, msgInLine, { flag: 'a' });
    } catch (error) {
      this.error(error);
    }
  }

  private async isEnabledLevel(logLevel: LogLevel) {
    const maxLevel = process.env.LOG_LEVEL;
    return logLevels.slice(+maxLevel).includes(logLevel);
  }

  private async formatCustomeMessage(message: string, logLevel: LogLevel) {
    const timestamp = this.getTimestamp();
    const levelFormatted = logLevel.toUpperCase();
    return `${timestamp}  ${levelFormatted}:  ${message}`;
  }

  private async getFileSize(path) {
    const stats = await stat(path);
    return stats.size;
  }

  private async getLogFiles() {
    try {
      const files = await readdir(process.env.PATH_TO_LOGS);
      return files;
    } catch (err) {
      this.error(err);
    }
  }

  private async getLastLogFileOfLevel(logLevel: LogLevel) {
    try {
      const files = await this.getLogFiles();
      if (files.length === 0) {
        return;
      }
      const pathToSearch = logLevel === 'error' ? 'error' : 'common';
      const filesOfLevel = files.filter((file) =>
        file.startsWith(pathToSearch),
      );
      if (filesOfLevel.length === 0) {
        return;
      }
      const pathToSearchLength = pathToSearch.length;
      const timestamps = filesOfLevel.map((file) =>
        Number(file.slice(pathToSearchLength, file.length - 4)),
      );
      const maxTimeStamp = Math.max(...timestamps);
      const maxIndex = timestamps.findIndex(
        (fileName) => fileName === maxTimeStamp,
      );
      return filesOfLevel[maxIndex];
    } catch (err) {
      this.error(err);
    }
  }

  private async createNewFileForLogLevel(logLevel: LogLevel) {
    try {
      const timestamp = Date.now();
      const fileToWrite = `${logFileConfig[logLevel]}${timestamp}.txt`;
      const resolvedPath = path.resolve(fileToWrite);
      return resolvedPath;
    } catch (err) {
      this.error(err);
    }
  }
}
