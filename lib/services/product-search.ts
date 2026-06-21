import type { Brand, Category, Product } from "@prisma/client";

export function buildProductSearchableContent(product: Product & { brand?: Brand | null; category?: Category | null }) {
  return [
    product.name,
    product.brand?.name,
    product.category?.name,
    product.price.toString(),
    product.availabilityStatus,
    product.shortDescription,
    product.longDescription,
    product.features.join(" "),
    product.materials.join(" "),
    product.mattressSize,
    product.warranty
  ].filter(Boolean).join(" | ");
}
