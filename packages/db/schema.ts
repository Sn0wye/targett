import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const goals = sqliteTable(
  'goals',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    name: text('title').notNull(),
    total: integer('total').notNull(),
    current: integer('current').notNull(),
    createdAt: text('createdAt').notNull(),
    updatedAt: text('updatedAt').notNull()
  },
  goals => ({
    userIdIndex: index('userIdIndex').on(goals.userId)
  })
);
