import type { z } from 'zod';
import { createLeagueZodSchema } from './create-league.dto';

export const updateLeagueZodSchema = createLeagueZodSchema
  .omit({ name: true, numberOfTeams: true, slug: true })
  .optional()
  .nonfalsy()
  .isobject()
  .haskeys();

export type UpdateLeagueDto = z.infer<typeof updateLeagueZodSchema>;
