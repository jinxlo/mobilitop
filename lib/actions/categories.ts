import { prisma } from "@/lib/db";

export function getCategories() {
  return prisma.category.findMany({ orderBy: { sortOrder: "asc" }, include: { _count: { select: { products: true } } } });
}

export async function toggleCategoryStatus(id: string) {
  const category = await prisma.category.findUniqueOrThrow({ where: { id } });
  return prisma.category.update({ where: { id }, data: { isActive: !category.isActive } });
}
