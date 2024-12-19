import type { z } from 'zod';
import { nonEmptyObject } from 'server/utils/zod';
import { leagueZodSchema } from './create-league.dto';

export const updateLeagueZodSchema = nonEmptyObject.and(leagueZodSchema.partial());
export type UpdateLeagueDto = z.infer<typeof updateLeagueZodSchema>;
