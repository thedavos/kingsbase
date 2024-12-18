import type { z } from 'zod';
import { createLeagueZod } from './create-league.dto';

export const updateLeagueDto = createLeagueZod.partial();
export type UpdateLeagueDto = z.infer<typeof updateLeagueDto>;
