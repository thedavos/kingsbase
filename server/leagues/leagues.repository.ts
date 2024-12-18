import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { logger } from 'server/common/decorators/logger.decorator';
import { BaseRepository } from 'server/common/repositories/base.repository';
import type { League } from 'server/database/schemas/leagues.schema';
import { leagues } from 'server/database/schemas/leagues.schema';
import { DatabaseService } from 'server/database';
import { LoggerService } from 'server/common/services/logger.service';

@logger('leagues.repository')
@injectable()
export class LeaguesRepository extends BaseRepository<League> {
  constructor(
    @inject(DatabaseService) protected readonly db: DatabaseService,
    @inject(LoggerService) protected readonly logger: LoggerService,
  ) {
    super(db, logger);
    this.tableName = 'leagues';
    this.table = leagues;
  }

  findManyWithImages(): Promise<League[]> {
    this.logger.debug(`Searching with images in ${this.tableName}`);

    return this.db.value.query.leagues.findMany({
      with: {
        images: true,
      },
    });
  }
}
