import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { commonFields, uuid } from './common.schema';

export const images = sqliteTable('images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uuid: uuid().unique().notNull(),
  url: text('url').notNull(),
  entityId: integer('entity_id').notNull(),
  entityType: text('entity_type').notNull(),
  title: text('title'),
  description: text('description'),
  expirationDate: text('expiration_date'),
  metadata: text('metadata', { mode: 'json' }).default([]),
  size: integer('size').notNull(),
  mimeType: text('mime_type').notNull(),
  altText: text('alt_text').default(''),
  createdBy: text('created_by').default(''),
  tags: text('tags', { mode: 'json' }).default([]),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(false),
  ...commonFields,
});

export type Image = typeof images.$inferSelect;
export type CreateImage = typeof images.$inferInsert;
