import { container } from 'tsyringe';
import { LoggerService } from 'server/common/services';

export function logger(context?: string) {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  return function (target: any) {
    const logger: LoggerService = container.resolve(LoggerService);
    if (context) {
      logger.setContext(context);
    }

    target.prototype.logger = logger;
  };
}
