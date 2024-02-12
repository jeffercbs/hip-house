import { createClient } from "@libsql/client";
import { reserveSchema } from "@/schemas/reserve";
import { z } from "zod";

export const db = createClient({
    url: import.meta.env.DATABASE_URL ?? "",
    authToken: import.meta.env.DATABASE_TOKEN ?? ""
});

export async function reserveFound(dni: number) {
    const res = await db.execute({
        sql: `SELECT visitor_dni, reserve_id FROM reserves where visitor_dni == ?`,
        args: [dni],
    });

    return res.rows;
}

export async function createReserve(data: z.infer<typeof reserveSchema>) {
    const {
        reserve_id = "",
        reserve_date,
        reserve_time,
        visitor_dni,
        visitor_email,
        visitor_name,
        visitor_phone,
    } = data;

    const Insert = {
        sql: `INSERT INTO reserves (reserve_id, visitor_name, visitor_dni, visitor_email, visitor_phone, reserve_date, reserve_time) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [reserve_id, visitor_name, visitor_dni, visitor_email, visitor_phone, reserve_date, reserve_time]
    }

    return await db.execute(Insert);
}
