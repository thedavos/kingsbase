import type { InferResultType } from 'server/database';

export type LeagueWithImages = InferResultType<'leagues', { images: true }>;
export type LeaguesWithImages = InferResultType<'leagues', { images: true }>[];
