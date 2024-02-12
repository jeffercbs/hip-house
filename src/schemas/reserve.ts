import { z } from "zod"

export const reserveSchema = z.object({
    reserve_id: z.string().optional(),
    reserve_date: z.string().or(z.date()).transform((v) => new Date(v)),
    reserve_time: z.string(),
    visitor_name: z.string(),
    visitor_dni: z.string().transform((v) => parseInt(v)),
    visitor_email: z.string(),
    visitor_phone: z.string(),
})