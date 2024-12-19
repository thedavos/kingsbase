import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { BaseRepository } from 'server/common/repositories/base.repository';
import { DatabaseService } from 'server/database';
import { LoggerService } from 'server/common/services';
import { leagues } from 'server/database/schemas/leagues.schema';
import type { League } from 'server/database/schemas/leagues.schema';

@injectable()
export class LeaguesRepository extends BaseRepository<League> {
  constructor(
    @inject(DatabaseService) protected readonly db: DatabaseService,
    @inject(LoggerService) protected readonly logger: LoggerService,
  ) {
    super(db, logger);
    this.tableName = 'leagues';
    this.table = leagues;
    this.logger.setContext('leagues');
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
