import { z } from "astro:content"
import { v4 as uuid } from "uuid"

export const reserveSchema = z.object({
    reserve_id: z.string().default(uuid()),
    reserve_date: z.string(),
    reserve_time: z.string(),
    reserve_status: z.enum(["active", "cancelled"]).default("active"),
    visitor_name: z.string(),
    visitor_dni: z.string().transform((v) => parseInt(v)),
    visitor_email: z.string(),
    visitor_phone: z.string(),
})