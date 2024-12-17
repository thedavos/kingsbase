import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { logger } from 'server/common/decorators/logger.decorator';
import { BaseRepository } from 'server/common/repositories/base.repository';
import type { Image } from 'server/database/schemas/images.schema';
import { DatabaseService } from 'server/database';
import { LoggerService } from 'server/common/services/logger.service';
import { images } from 'server/database/schemas/images.schema';

@logger('image.repository')
@injectable()
export class ImageRepository extends BaseRepository<Image> {
  constructor(
    @inject(DatabaseService) protected readonly db: DatabaseService,
    @inject(LoggerService) protected readonly logger: LoggerService,
  ) {
    super(db, logger);
    this.tableName = 'images';
    this.table = images;
  }
}
