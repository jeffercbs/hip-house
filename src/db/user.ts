import { z } from "zod"
import { userShema } from "@/schemas/user"
import { db } from "./client"

export async function findAllUsers() {
    return await db.execute({
        sql: `SELECT * FROM users `,
        args: []
    });
}

export async function findUser(email: string) {
    const res = await db.execute({
        sql: `SELECT * FROM users WHERE user_email = ?`,
        args: [email],
    });
    return res.rows;
}

export async function createUser(data: z.infer<typeof userShema>) {
    const {
        user_id = "",
        user_role,
        user_name,
        user_email,
    } = data;

    const Insert = {
        sql: `INSERT INTO users (user_id, user_role, user_name, user_email) VALUES (?, ?, ?, ?)`,
        args: [user_id, user_role, user_name, user_email]
    }

    return await db.execute(Insert);
}
