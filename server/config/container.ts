import 'reflect-metadata';
import { container, delay } from 'tsyringe';
import { DatabaseService } from 'server/database';
import { LoggerService } from 'server/common/services/logger.service';
import { LoggingInterceptor } from 'server/common/interceptors/logging.interceptor';
// import leaguesModule from 'server/leagues/leagues.module';
import { ImageService } from 'server/common/services/image.service';
// import { registerModule } from './registerModule';

export function setupContainer() {
  container.registerSingleton('LoggingInterceptor', delay(() => LoggingInterceptor));
  container.registerSingleton('LoggerService', delay(() => LoggerService));
  container.registerSingleton('ImageService', delay(() => ImageService));
  container.registerSingleton('DatabaseService', delay(() => DatabaseService));
  // registerModule(leaguesModule);
}
