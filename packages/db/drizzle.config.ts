import { type Config } from 'drizzle-kit';

export default {
  out: './migrations',
  schema: './schema.ts',
  breakpoints: true
} satisfies Config;
