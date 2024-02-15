import { db } from "./client";
import { reserveSchema } from "@/schemas/reserve";
import { z } from "astro:content";

export async function findAllReserves(): Promise<any[]> {
    const res = await db.execute({
        sql: `SELECT * FROM reserves`,
        args: [],
    });

    return res.rows;
}

export async function findReserve(dni: number) {
    const res = await db.execute({
        sql: `SELECT visitor_dni, reserve_id FROM reserves where visitor_dni == ?`,
        args: [dni],
    });

    return res.rows;
}

export async function createReserve(data: z.infer<typeof reserveSchema>) {
    const {
        reserve_id,
        reserve_date,
        reserve_time,
        reserve_status,
        visitor_dni,
        visitor_email,
        visitor_name,
        visitor_phone,
    } = data;

    await db
        .execute({
            sql: `INSERT INTO reserves (reserve_id, reserve_time, reserve_status, visitor_name, visitor_dni, visitor_email, visitor_phone, reserve_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
                reserve_id,
                reserve_time,
                reserve_status,
                visitor_name,
                visitor_dni,
                visitor_email,
                visitor_phone,
                reserve_date,
            ],
        })
        .then((res) => {
            return res.rows;
        })
        .catch((err) => {
            console.error(err);
        });
}

export async function deleteReserve(id: string) {
    await db.execute({
        sql: `DELETE FROM reserves WHERE reserve_id = ?`,
        args: [id],
    });
}