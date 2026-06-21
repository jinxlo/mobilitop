import { prisma } from "@/lib/db";

export function getProductsAdmin() {
  return prisma.product.findMany({ include: { brand: true, category: true, images: true }, orderBy: { updatedAt: "desc" } });
}

export async function toggleProductStatus(id: string) {
  const product = await prisma.product.findUniqueOrThrow({ where: { id } });
  return prisma.product.update({ where: { id }, data: { isActive: !product.isActive } });
}

export async function toggleFeaturedProduct(id: string) {
  const product = await prisma.product.findUniqueOrThrow({ where: { id } });
  return prisma.product.update({ where: { id }, data: { isFeatured: !product.isFeatured } });
}

export async function togglePromotionProduct(id: string) {
  const product = await prisma.product.findUniqueOrThrow({ where: { id } });
  return prisma.product.update({ where: { id }, data: { isPromotion: !product.isPromotion } });
}

export async function duplicateProduct(id: string) {
  const product = await prisma.product.findUniqueOrThrow({ where: { id }, include: { images: true } });
  const copyName = `${product.name} copia`;
  return prisma.product.create({
    data: {
      name: copyName,
      slug: `${product.slug}-copia-${Date.now()}`,
      sku: product.sku ? `${product.sku}-COPY` : null,
      brandId: product.brandId,
      categoryId: product.categoryId,
      subcategory: product.subcategory,
      mattressSize: product.mattressSize,
      mattressType: product.mattressType,
      firmness: product.firmness,
      price: product.price,
      previousPrice: product.previousPrice,
      currency: product.currency,
      stockQuantity: product.stockQuantity,
      availabilityStatus: product.availabilityStatus,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      features: product.features,
      materials: product.materials,
      warranty: product.warranty,
      careInstructions: product.careInstructions,
      searchableContent: product.searchableContent,
      images: { create: product.images.map((image) => ({ imageUrl: image.imageUrl, altText: image.altText, sortOrder: image.sortOrder, isMain: image.isMain })) }
    }
  });
}
