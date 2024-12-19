import type { SQL } from 'drizzle-orm';
import type { IRepository } from 'server/common/repositories/repository.interface';
import type { DatabaseService } from 'server/database';
import type { LoggerService } from 'server/common/services';
import type { KGError } from 'server/common/types/errors.types';

export class BaseRepository<T> implements IRepository<T> {
  protected tableName: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  protected table: any;

  constructor(
    protected readonly db: DatabaseService,
    protected readonly logger: LoggerService,
  ) {}

  async create(data: Partial<T>): Promise<T> {
    try {
      this.logger.debug(`Creating in ${this.tableName}`, { data });

      const recordCreated = (await this.db.value.insert(this.table).values(data).returning())[0];

      return recordCreated as T;
    }
    catch (e) {
      const error = e as KGError;
      this.logger.error(`Error creating in ${this.tableName}`, error.stack);
      throw error;
    }
  }

  async update(data: Partial<T> = {}, filterBy: any): Promise<T> {
    try {
      this.logger.debug(`Updating in ${this.tableName}`, { data });

      const recordUpdated = await this.db.value.update(this.table).set(data).where(filterBy).returning().get();

      return recordUpdated as T;
    }
    catch (e) {
      const error = e as KGError;
      this.logger.error(`Error updating in ${this.tableName}`, error.stack);
      throw error;
    }
  }

  async findAll(query: SQL | undefined = undefined): Promise<T[]> {
    this.logger.debug(`Searching in ${this.tableName}`);

    const records = await this.db.value.select().from(this.table).where(query).all();

    return records as T[];
  }

  async findOne(id: number): Promise<T | null> {
    try {
      const result = await this.db.value
        .select()
        .from(this.table)
        .where(eq(this.table.id, id))
        .limit(1);

      return result[0] as T || null;
    }
    catch (e) {
      const error = e as KGError;
      this.logger.error(`Error finding ${this.tableName}`, error.stack);
      throw error;
    }
  }

  async deactivate(id: number): Promise<T> {
    try {
      const records = await this.db.value.update(this.table).set({ isVisible: false }).where(eq(this.table.id, id)).returning();

      return records[0] as T;
    }
    catch (e) {
      const error = e as KGError;
      this.logger.error(`Error deactivating ${this.tableName}`, error.stack);
      throw error;
    }
  }
}
