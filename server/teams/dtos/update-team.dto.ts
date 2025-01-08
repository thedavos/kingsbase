import type { z } from 'zod';
import { createTeamZodSchema } from './create-team.dto';

export const updateTeamZodSchema = createTeamZodSchema
  .omit({ name: true, slug: true })
  .optional()
  .nonfalsy()
  .isobject()
  .haskeys();

export type UpdateTeamDto = z.infer<typeof updateTeamZodSchema>;
