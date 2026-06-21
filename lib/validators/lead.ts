import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Indica tu nombre"),
  phone: z.string().min(6, "Indica un teléfono válido"),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(5, "Cuéntanos qué necesitas"),
  productId: z.string().optional().nullable()
});
