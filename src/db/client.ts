import { createClient } from "@libsql/client";
import { reserveSchema } from "@/schemas/reserve";
import { z } from "zod";

export const db = createClient({
    url: import.meta.env.DATABASE_URL ?? "",
    authToken: import.meta.env.DATABASE_TOKEN ?? ""
});

