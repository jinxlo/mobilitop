import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categoryMap: Record<string, string> = {
  colchones: "/images/category-colchones.png",
  bases: "/images/category-bases.png",
  almohadas: "/images/category-almohadas.png",
  protectores: "/images/category-protectores.png",
  muebles: "/images/category-muebles.png",
  promociones: "/images/category-promociones.png"
};

async function main() {
  for (const [slug, imageUrl] of Object.entries(categoryMap)) {
    await prisma.category.updateMany({ where: { slug }, data: { imageUrl } });
  }

  const products = await prisma.product.findMany({ orderBy: { sortOrder: "asc" }, take: 4 });
  for (const [index, product] of products.entries()) {
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    await prisma.productImage.create({
      data: {
        productId: product.id,
        imageUrl: `/images/product-${index + 1}.png`,
        altText: product.name,
        sortOrder: 0,
        isMain: true
      }
    });
  }

  const slides = await prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" }, take: 3 });
  for (const [index, slide] of slides.entries()) {
    await prisma.heroSlide.update({ where: { id: slide.id }, data: { imageUrl: `/images/hero-${index + 1}.png` } });
  }
}

main().finally(() => prisma.$disconnect());
