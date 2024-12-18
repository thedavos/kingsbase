import { randomUUID } from 'crypto';
import type { H3Event } from 'h3';
import { injectable, inject } from 'tsyringe';
import { LoggerService } from 'server/common/services/logger.service';
import type { KGError } from 'server/common/types/errors.types';

@injectable()
export class LoggingInterceptor {
  constructor(
    @inject(LoggerService) private readonly logger: LoggerService,
  ) {
    this.logger.setContext('middleware');
  }

  intercept(event: H3Event) {
    const requestId = randomUUID();
    const method = event.method;
    const url = event.path;
    const userAgent = event.headers.get('user-agent');
    const ip = event.headers.get('x-forwarded-for') || event.headers.get('x-real-ip');

    this.logger.log(
      `Incoming Request: ${method} ${url}`,
      {
        requestId,
        method,
        url,
        userAgent,
        ip,
      },
    );

    const start = performance.now();

    try {
      event.node.res.once('close', () => {
        const duration = Math.round(performance.now() - start);

        this.logger.log(
          `Request completed: ${method} ${url}`,
          {
            requestId,
            duration: `${duration}ms`,
            status: 200,
          },
        );
      });
    }
    catch (e) {
      const error = e as KGError;
      const duration = Math.round(performance.now() - start);

      this.logger.error(
        `Request failed: ${method} ${url}`,
        error.stack,
        {
          requestId,
          duration: `${duration}ms`,
          status: error.statusCode || 500,
          error: error.message,
        },
      );

      throw error;
    }
  }
}
