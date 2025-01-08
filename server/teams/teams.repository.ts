import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { BaseRepository } from 'server/common/repositories/base.repository';
import { DatabaseService } from 'server/database';
import { LoggerService } from 'server/common/services';
import { teams } from 'server/database/schemas/teams.schema';
import type { Team } from 'server/database/schemas/teams.schema';

@injectable()
export class TeamsRepository extends BaseRepository<Team> {
  constructor(
    @inject(DatabaseService) protected readonly db: DatabaseService,
    @inject(LoggerService) protected readonly logger: LoggerService,
  ) {
    super(db, logger);
    this.tableName = 'teams';
    this.table = teams;
    this.logger.setContext('teams');
  }
}
