import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(2).optional(),
  sku: z.string().optional().nullable(),
  brandId: z.string().optional().nullable(),
  categoryId: z.string().min(1),
  subcategory: z.string().optional().nullable(),
  mattressSize: z.string().optional().nullable(),
  mattressType: z.string().optional().nullable(),
  firmness: z.string().optional().nullable(),
  price: z.coerce.number().positive(),
  previousPrice: z.coerce.number().nonnegative().optional().nullable(),
  currency: z.string().default("USD"),
  stockQuantity: z.coerce.number().int().nonnegative().default(0),
  availabilityStatus: z.enum(["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK", "ON_REQUEST"]).default("IN_STOCK"),
  shortDescription: z.string().max(300).optional().nullable(),
  longDescription: z.string().optional().nullable(),
  features: z.array(z.string()).default([]),
  materials: z.array(z.string()).default([]),
  warranty: z.string().optional().nullable(),
  careInstructions: z.string().optional().nullable(),
  seoTitle: z.string().max(70).optional().nullable(),
  seoDescription: z.string().max(160).optional().nullable(),
  isActive: z.coerce.boolean().default(true),
  isFeatured: z.coerce.boolean().default(false),
  isPromotion: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0)
}).refine((data) => !data.previousPrice || data.previousPrice > data.price, {
  message: "El precio anterior debe ser mayor al precio actual",
  path: ["previousPrice"]
});

export function searchableProductContent(input: z.infer<typeof productSchema>) {
  return [
    input.name,
    input.sku,
    input.subcategory,
    input.mattressSize,
    input.mattressType,
    input.firmness,
    input.shortDescription,
    input.longDescription,
    input.features.join(" "),
    input.materials.join(" "),
    input.warranty,
    input.careInstructions
  ]
    .filter(Boolean)
    .join(" | ");
}
