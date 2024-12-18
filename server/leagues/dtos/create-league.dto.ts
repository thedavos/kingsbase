import { z } from 'zod';

export const leagueZodSchema = z.object({
  id: z.number().int().nonnegative(), // id must be a non-negative integer
  uuid: z.string().uuid(), // uuid must be a valid UUID
  name: z.string().min(1, 'Name is required'), // name must be a non-empty string
  slug: z.string().min(1, 'Slug is required'), // slug must be a non-empty string
  country: z.string().optional(), // country is optional
  city: z.string().optional(), // city is optional
  logo: z.string().url().optional(), // logo must be a valid URL if provided
  foundationYear: z.number().int().optional(), // foundationYear must be an integer if provided
  website: z.string().url().optional(), // website must be a valid URL if provided
  twitterHandle: z.string().optional(), // twitterHandle is optional
  instagramHandle: z.string().optional(), // instagramHandle is optional
  numberOfTeams: z.number().int().nonnegative(), // numberOfTeams must be a non-negative integer
  description: z.string().optional(), // description is optional
  rules: z.string().optional(), // rules is optional
  isActive: z.boolean().optional(), // isActive must be a boolean
  isVisible: z.boolean().optional(), // isVisible must be a boolean
  createdAt: z.date().optional(), // createdAt must be a date
  updatedAt: z.date().optional(), // updatedAt must be a date if provided
});

export const createLeagueZodSchema = leagueZodSchema.omit({ id: true, uuid: true, createdAt: true, updatedAt: true });

export type LeagueDto = z.infer<typeof leagueZodSchema>;
export type CreateLeagueDto = z.infer<typeof createLeagueZodSchema>;
