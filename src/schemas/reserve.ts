import { z } from 'astro:content';

export const reserveSchema = z.object({
  reserve_id: z.string().default(''),
  reserve_date: z.string(),
  reserve_time: z.string(),
  reserve_status: z.enum(['ACTIVE', 'CANCELLED']).default('ACTIVE'),
  visitor_name: z.string(),
  visitor_dni: z.string().transform((v) => parseInt(v)),
  visitor_email: z.string(),
  visitor_phone: z.string(),
});
