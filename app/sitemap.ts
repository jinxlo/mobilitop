import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.PUBLIC_SITE_URL ?? "http://localhost:3000";
  const basePaths = ["", "/productos", "/promociones", "/nosotros", "/contacto", "/garantia"];

  try {
    const [products, categories, brands] = await Promise.all([
      prisma.product.findMany({ where: { isActive: true } }),
      prisma.category.findMany({ where: { isActive: true } }),
      prisma.brand.findMany({ where: { isActive: true } })
    ]);

    return [
      ...basePaths,
      ...products.map((product) => `/productos/${product.slug}`),
      ...categories.map((category) => `/categorias/${category.slug}`),
      ...brands.map((brand) => `/marcas/${brand.slug}`)
    ].map((pathName) => ({ url: `${siteUrl}${pathName}`, lastModified: new Date() }));
  } catch {
    return basePaths.map((pathName) => ({ url: `${siteUrl}${pathName}`, lastModified: new Date() }));
  }
}
