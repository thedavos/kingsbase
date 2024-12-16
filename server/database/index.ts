import { singleton } from 'tsyringe';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';
import type { D1Database } from '@nuxthub/core';
import * as schema from './schema';

type DrizzleDatabase = DrizzleD1Database<typeof schema>;

@singleton()
export class DatabaseService {
  private readonly db: DrizzleDatabase;

  constructor() {
    this.db = drizzle<typeof schema, D1Database>(hubDatabase(), { schema });
  }

  public get value(): DrizzleDatabase {
    return this.db;
  }
}
