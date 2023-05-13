import { migrate } from 'drizzle-orm/libsql/migrator';

import { db } from '.';

async function main() {
  await migrate(db, {
    migrationsFolder: './migrations'
  });

  console.log('✅ Migrations complete');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
