import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const sqlite = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
});

export const db = drizzle(sqlite);

export * from './schema';
export * from 'drizzle-orm';
