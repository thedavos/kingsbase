import 'reflect-metadata';
import { container } from 'tsyringe';
import { LoggingInterceptor } from 'server/common/interceptors/logging.interceptor';

export default defineEventHandler((event) => {
  const loggerInterceptor = container.resolve(LoggingInterceptor);
  loggerInterceptor.intercept(event);
});
