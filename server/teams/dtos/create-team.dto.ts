import { z } from 'zod';

export const teamZodSchema = z.object({
  id: z.number().int().nonnegative(), // id must be a non-negative integer
  uuid: z.string().uuid(), // uuid must be a valid UUID
  name: z.string().min(1, 'Name is required'), // name must be a non-empty string
  slug: z.string().min(1, 'Slug is required'), // slug must be a non-empty string
  shortName: z.string().optional(), // abbreviation is optional
  abbreviation: z.string().optional(), // abbreviation is optional
  logo: z.string().optional(), // logo is a pathname and is optional
  foundationYear: z.number().int().optional(), // foundationYear must be an integer if provided
  budget: z.number().int().nonnegative().optional(), // numberOfTeams must be a non-negative integer
  leagueId: z.number().int().nonnegative().optional(), // id must be a non-negative integer
  isActive: z.boolean().optional(), // isActive must be a boolean
  isVisible: z.boolean().optional(), // isVisible must be a boolean
  createdAt: z.date().optional(), // createdAt must be a date
  updatedAt: z.date().optional(), // updatedAt must be a date if provided
});

export const createTeamZodSchema = teamZodSchema.omit({ id: true, uuid: true, createdAt: true, updatedAt: true });

export type TeamDto = z.infer<typeof teamZodSchema>;
export type CreateTeamDto = z.infer<typeof createTeamZodSchema>;
