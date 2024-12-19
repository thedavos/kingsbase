// global.d.ts
import type { LoggerService } from 'server/common/services';

declare global {
  interface Function {
    logger: LoggerService;
  }
}
