import { FeaturedProducts } from "@/components/public/FeaturedProducts";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/tenant-config";

export default async function PromotionsPage() {
  const [settings, products] = await Promise.all([
    getSiteSettings(),
    prisma.product.findMany({ where: { isActive: true, isPromotion: true }, include: { brand: true, category: true, images: true }, orderBy: { updatedAt: "desc" } })
  ]);
  return <main><FeaturedProducts products={products} whatsappNumber={settings.whatsappNumber} title="Promociones disponibles" /></main>;
}
