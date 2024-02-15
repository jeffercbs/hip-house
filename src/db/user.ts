import { z } from "zod"
import { userShema } from "@/schemas/user"
import { db } from "./client"

export async function findAllUsers() {
    return await db.execute("SELECT * FROM users");
}

export async function findUser(email: string) {
    return await db.execute({
        sql: "SELECT * FROM users WHERE user_email = ? LIMIT 1",
        args: [email]
    }).then((result) => result.rows[0]);
}

export async function createUser(data: z.infer<typeof userShema>) {
    const {
        user_id = "",
        user_role,
        user_name,
        user_email,
        user_picture = ""
    } = data;

    const Insert = {
        sql: `INSERT INTO users (user_id, user_role, user_name, user_picture, user_email) VALUES (?, ?, ?, ?, ?)`,
        args: [user_id, user_role, user_name, user_picture, user_email]
    }

    return await db.execute(Insert);
}
