import 'reflect-metadata';
import { container } from 'tsyringe';
import { DatabaseService } from 'server/database';
import { LoggerService } from 'server/common/services';
import { LoggingInterceptor } from 'server/common/interceptors/logging.interceptor';
import leaguesModule from 'server/leagues/leagues.module';
import teamsModule from 'server/teams/teams.module';
import { ImageService } from 'server/common/services/image.service';
import { registerModule } from './registerModule';

export function setupContainer() {
  container.registerSingleton(LoggingInterceptor);
  container.registerSingleton(LoggerService);
  container.registerSingleton(ImageService);
  container.registerSingleton(DatabaseService);
  registerModule(leaguesModule);
  registerModule(teamsModule);
}
