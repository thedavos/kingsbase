import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { createConsola } from 'consola/core';
import type { ConsolaInstance } from 'consola/core';

@singleton()
export class LoggerService {
  private logger: ConsolaInstance;
  private context?: string;

  constructor() {
    this.logger = createConsola({ formatOptions: {
      columns: 80,
      colors: true,
      date: true,
    } }).withTag('logger.service');
  }

  setContext(context: string) {
    this.logger = this.logger.withTag(context);
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
    this.logger.error(
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
    this.logger.verbose(this.formatMessage(message), ...args);
  }

  box(message: string, ...args: unknown[]) {
    this.logger.box(this.formatMessage(message), ...args);
  }
}
