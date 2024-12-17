import { container } from 'tsyringe';
import { LoggingInterceptor } from 'server/common/interceptors/logging.interceptor';

export default eventHandler((event) => {
  const loggerInterceptor = container.resolve(LoggingInterceptor);
  return loggerInterceptor.intercept(event, () => Promise.resolve());
});
