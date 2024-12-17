export type WhereCondition = Record<string, never>;

export interface QueryOptions {
  where?: WhereCondition;
  select?: string[];
  relations?: string[];
  order?: Record<string, 'asc' | 'desc'>;
  skip?: number;
  take?: number;
}
