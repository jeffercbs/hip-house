import { z } from "zod"

export const userShema = z.object({
    user_id: z.string(),
    user_role: z.enum(["admin", "client"]).default("client"),
    user_name: z.string(),
    user_email: z.string(),
})