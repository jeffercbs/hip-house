import { createClient } from '@libsql/client';

export const db = createClient({
  url: import.meta.env.DB_CONNECTION,
  authToken: import.meta.env.DB_AUTH_TOKEN,
});
