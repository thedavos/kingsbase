import 'reflect-metadata';
import { inspect } from 'util';
import { singleton } from 'tsyringe';
import { createConsola } from 'consola/basic';
import { box } from 'consola/utils';
import chalk from 'chalk';
import type { ChalkInstance } from 'chalk';
import type { ConsolaInstance } from 'consola/basic';

const formatConsoleDate = (date: Date | number): string => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const mapConsolaArgs = (args: any, chalk: ChalkInstance): any[] => {
  return args.map((arg: any) => {
    if (typeof arg === 'object') {
      const data = inspect(arg, { colors: false, depth: null });
      return chalk(data);
    }

    return chalk(arg);
  });
};

@singleton()
export class LoggerService {
  private logger: ConsolaInstance;
  private context: string = 'logger';

  constructor() {
    this.logger = createConsola({
      level: 5,
      formatOptions: {
        columns: 20,
        date: true,
        colors: true,
      },
      reporters: [
        {
          log: (logData) => {
            const date = formatConsoleDate(logData.date);
            const context = this.context.toUpperCase();

            switch (logData.type) {
              case 'debug':
                console.log(
                  chalk.blue(`${date}`),
                  chalk.bgBlueBright.whiteBright(' DEBUG '),
                  chalk.blue(`[${context}]`),
                  ...mapConsolaArgs(logData.args, chalk.bold.white),
                );
                break;
              case 'info':
                console.log(
                  chalk.bgGray.white(' INFO '),
                  chalk.gray(`[${context}]`),
                  ...mapConsolaArgs(logData.args, chalk.bold.gray),
                );
                break;
              case 'warn':
                console.log(
                  chalk.bgYellowBright.black(' WARN '),
                  chalk.yellow(`[${context}]`),
                  ...mapConsolaArgs(logData.args, chalk.bold.yellow),
                );
                break;
              case 'error':
                console.log(
                  chalk.bgRedBright.black(' ERROR '),
                  chalk.red(`[${context}]`),
                  ...mapConsolaArgs(logData.args, chalk.bold.red),
                );
                break;
              case 'box':
                console.log(
                  chalk.bgGray.white(' INFO '),
                  chalk.gray(`[${context}]`),
                  chalk.gray(box(logData.args.join(''))),
                );
                break;
              case 'verbose':
                console.log(
                  chalk.blue(`${date}`),
                  chalk.bgGray.whiteBright(' [VERBOSE] '),
                  chalk.white(`[${context}]`),
                  ...mapConsolaArgs(logData.args, chalk.bold.white),
                );
                break;
              default:
                console.log(...logData.args);
                break;
            }
          },
        },
      ],
    });
  }

  setContext(context: string) {
    this.context = context;
    return this;
  }

  log(message: string, ...args: unknown[]) {
    this.logger.info(message, ...args);
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  error(message: string, trace?: string, ...args: string[] | any[]) {
    this.logger.error(
      {
        msg: message,
        trace,
      },
      ...args,
    );
  }

  warn(message: string, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }

  debug(message: string, ...args: unknown[]) {
    this.logger.debug(message, ...args);
  }

  verbose(message: string, ...args: unknown[]) {
    this.logger.verbose(message, ...args);
  }

  box(message: string, ...args: unknown[]) {
    this.logger.box(message, ...args);
  }
}
