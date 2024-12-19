import { singleton } from 'tsyringe';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { BuildQueryResult, DBQueryConfig, ExtractTablesWithRelations } from 'drizzle-orm';
import { useDB } from 'server/utils/db';
import type * as schema from './schema';

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;
type DrizzleDatabase = DrizzleD1Database<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>['with'];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined,
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With;
  }
>;

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
