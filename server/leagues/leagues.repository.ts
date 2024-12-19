import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { BaseRepository } from 'server/common/repositories/base.repository';
import { DatabaseService } from 'server/database';
import { LoggerService } from 'server/common/services';
import { leagues } from 'server/database/schemas/leagues.schema';
import type { League } from 'server/database/schemas/leagues.schema';
import type { LeagueWithImages } from 'server/database/schemas/relations.schema';

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

  async findLeaguesWithImages() {
    this.logger.debug(`Searching leagues with images`);

    const leaguesWithImages = await this.db.value.query.leagues.findMany({
      with: {
        images: true,
      },
    });

    this.logger.debug('Leagues with images founded: ', leaguesWithImages);

    return leaguesWithImages as LeagueWithImages[];
  }

  async findLeagueWithImages(id: number) {
    this.logger.debug(`Searching league with images`);

    const leagueWithImages = await this.db.value.query.leagues.findFirst({
      with: {
        images: true,
      },
      where: eq(this.table.id, id),
    });

    this.logger.debug('League with images founded: ', leagueWithImages);

    return leagueWithImages as LeagueWithImages;
  }
}
