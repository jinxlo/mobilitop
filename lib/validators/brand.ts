import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).optional(),
  logoUrl: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  isActive: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0)
});
