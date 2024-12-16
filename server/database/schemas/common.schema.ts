import { randomUUID } from 'crypto';
import { integer, text } from 'drizzle-orm/sqlite-core';

export const uuid = () => text('uuid').$defaultFn(() => randomUUID());

export const commonFields = {
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  isVisible: integer('is_visible', { mode: 'boolean' }).notNull().default(true),
};
