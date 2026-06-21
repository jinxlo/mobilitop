import { prisma } from "@/lib/db";

export function getBrands() {
  return prisma.brand.findMany({ orderBy: { sortOrder: "asc" }, include: { _count: { select: { products: true } } } });
}

export async function toggleBrandStatus(id: string) {
  const brand = await prisma.brand.findUniqueOrThrow({ where: { id } });
  return prisma.brand.update({ where: { id }, data: { isActive: !brand.isActive } });
}
