import { createClient } from "@libsql/client";

export const db = createClient({
  url: import.meta.env.URL_DATABASE,
  authToken: import.meta.env.URL_DATABASE_TOKEN,
});
