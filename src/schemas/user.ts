import { z } from 'astro:content';

export const userShema = z.object({
  user_id: z.string(),
  user_role: z.enum(['admin', 'client']).default('client'),
  user_picture: z.string().optional(),
  user_name: z.string(),
  user_email: z.string(),
});
