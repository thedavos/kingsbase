import { singleton } from 'tsyringe';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { useDB } from 'server/utils/db';
import type * as schema from './schema';

type DrizzleDatabase = DrizzleD1Database<typeof schema>;

@singleton()
export class DatabaseService {
  private readonly db: DrizzleDatabase;

  constructor() {
    this.db = useDB();
  }

  public get value(): DrizzleDatabase {
    return this.db;
  }
}
