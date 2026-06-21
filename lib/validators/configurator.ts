import { z } from "zod";

export const configuratorSchema = z.object({
  productNeed: z.enum(["sofa", "bed_base", "headboard", "mattress", "ottoman", "unsure"]),
  model: z.string().min(1).max(80),
  size: z.string().min(1).max(80),
  fabric: z.string().min(1).max(80),
  color: z.string().min(1).max(80),
  legs: z.string().min(1).max(80),
  extras: z.array(z.string().min(1).max(80)).max(8).default([]),
  delivery: z.string().min(1).max(80),
  budget: z.string().min(1).max(80),
  notes: z.string().max(500).optional().default("")
});

export type ConfiguratorInput = z.infer<typeof configuratorSchema>;
