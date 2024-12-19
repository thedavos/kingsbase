import { z } from 'zod';

export const nonEmptyObject = z.object({}).refine(obj => Object.keys(obj).length > 0, {
  message: 'Object cannot be empty',
});
