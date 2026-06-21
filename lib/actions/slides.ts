import { prisma } from "@/lib/db";

export function getSlides() {
  return prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function toggleSlideStatus(id: string) {
  const slide = await prisma.heroSlide.findUniqueOrThrow({ where: { id } });
  return prisma.heroSlide.update({ where: { id }, data: { isActive: !slide.isActive } });
}
