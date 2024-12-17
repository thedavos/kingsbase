import 'reflect-metadata';
import { singleton } from 'tsyringe';
import pino from 'pino';

@singleton()
export class LoggerService {
  private logger: pino.Logger;
  private context?: string;

  constructor() {
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    });
  }

  setContext(context: string) {
    this.context = context;
    return this;
  }

  private formatMessage(message: string): string {
    return this.context ? `[${this.context}] ${message}` : message;
  }

  log(message: string, ...args: unknown[]) {
    this.logger.info(this.formatMessage(message), ...args);
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  error(message: string, trace?: string, ...args: string[] | any[]) {
    this.logger.error<Record<string, unknown>>(
      {
        msg: this.formatMessage(message),
        trace,
      },
      ...args,
    );
  }

  warn(message: string, ...args: unknown[]) {
    this.logger.warn(this.formatMessage(message), ...args);
  }

  debug(message: string, ...args: unknown[]) {
    this.logger.debug(this.formatMessage(message), ...args);
  }

  verbose(message: string, ...args: unknown[]) {
    this.logger.trace(this.formatMessage(message), ...args);
  }
}
