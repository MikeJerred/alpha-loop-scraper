import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './schema';

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DB_CONNECTION,
  }),
});

export const db = new Kysely<Database>({ dialect });
