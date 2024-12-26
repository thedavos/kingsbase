import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { commonFields, uuid } from './common.schema';

export const leagues = sqliteTable('leagues', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uuid: uuid(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  abbr: text('abbr'),
  country: text('country'),
  city: text('city'),
  logo: text('logo'),
  foundationYear: integer('foundation_year'),
  website: text('website'),
  twitterHandle: text('twitter_handle'),
  instagramHandle: text('instagram_handle'),
  numberOfTeams: integer('number_of_teams').notNull(),
  description: text('description'),
  rules: text('rules'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  ...commonFields,
});

export type League = typeof leagues.$inferSelect;
export type CreateLeague = typeof leagues.$inferInsert;
