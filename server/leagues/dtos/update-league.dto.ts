import type { z } from 'zod';
import { leagueZodSchema } from './create-league.dto';

export const updateLeagueDto = leagueZodSchema.partial();
export type UpdateLeagueDto = z.infer<typeof updateLeagueDto>;
