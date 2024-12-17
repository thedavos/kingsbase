import { container } from 'tsyringe';
import { LoggerService } from 'server/common/services/logger.service';

export function logger(context?: string) {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  return function (target: any) {
    const logger = container.resolve(LoggerService);
    if (context) {
      logger.setContext(context);
    }

    target.prototype.logger = logger;
  };
}
