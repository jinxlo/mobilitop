import { z } from "zod";

export const slideSchema = z.object({
  title: z.string().min(3),
  subtitle: z.string().optional().nullable(),
  imageUrl: z.string().min(1),
  buttonLabel: z.string().optional().nullable(),
  buttonUrl: z.string().optional().nullable(),
  secondaryButtonLabel: z.string().optional().nullable(),
  secondaryButtonUrl: z.string().optional().nullable(),
  isActive: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0)
});
