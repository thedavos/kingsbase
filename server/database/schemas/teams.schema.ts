import { integer, sqliteTable as table, text } from 'drizzle-orm/sqlite-core';
import { commonFields, uuid } from './common.schema';
import { leagues } from './leagues.schema';

export enum AchievementType {
  SPLIT_PLAYOFFS = 'split_playoffs',
  SPLIT_REGULAR = 'split_regular',
  WORLD_CUP = 'world_cup',
}

export enum SplitType {
  SPLIT_1 = 'split_1',
  SPLIT_2 = 'split_2',
}

export enum Position {
  CHAMPION = 'champion',
  SUB_CHAMPION = 'sub_champion',
  THIRD_PLACE = 'third_place',
  FOURTH_PLACE = 'fourth_place',
  SEMIFINALIST = 'semifinalist',
  QUARTERFINALIST = 'quarterfinalist',
}

export const teams = table('teams', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uuid: uuid(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  shortName: text('short_name'),
  abbreviation: text('abbreviation'),
  logo: text('logo'),
  foundationYear: integer('foundation_year'),
  budget: integer('budget'),
  leagueId: integer('league_id').references(() => leagues.id),
  isActive: integer('is_active', { mode: 'boolean' })
    .notNull()
    .default(true),
  ...commonFields,
});

const teamAchievementsTypes = Object.values(AchievementType) as [string, ...string[]];
const splitTypes = Object.values(SplitType) as [string, ...string[]];
const positionType = Object.values(Position) as [string, ...string[]];

export const teamAchievements = table('team_achievements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  teamId: integer('team_id')
    .references(() => teams.id)
    .notNull(),
  type: text('type', { enum: teamAchievementsTypes }).default(AchievementType.SPLIT_PLAYOFFS),
  split: text('split', { enum: splitTypes }),
  position: text('position', { enum: positionType })
    .notNull(),

  // Año y temporada
  year: integer('year').notNull(),
  season: text('season').notNull(), // "2023-24"

  title: text('title').notNull(),
  description: text('description'),

  ...commonFields,
});

export type Team = typeof teams.$inferSelect;
export type CreateTeam = typeof teams.$inferInsert;

export type TeamAchievement = typeof teamAchievements.$inferSelect;
export type CreateTeamAchievement = typeof teamAchievements.$inferInsert;
