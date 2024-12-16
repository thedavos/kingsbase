import { relations } from 'drizzle-orm';
import { leagues } from './leagues.schema';
import { images } from './images.schema';

export const leaguesRelations = relations(leagues, ({ many }) => ({
  images: many(images),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  league: one(leagues, { fields: [images.entityId], references: [leagues.id] }),
}));
