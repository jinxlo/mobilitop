import { notFound } from "next/navigation";
import { FeaturedProducts } from "@/components/public/FeaturedProducts";
import { ProductDetails } from "@/components/public/ProductDetails";
import { ProductGallery } from "@/components/public/ProductGallery";
import { prisma } from "@/lib/db";
import { createMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/tenant-config";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return {};
  return createMetadata({ title: `${product.name} | Mobili Top`, description: product.shortDescription ?? "Producto de descanso disponible para consulta.", path: `/productos/${slug}` });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, product] = await Promise.all([
    getSiteSettings(),
    prisma.product.findUnique({ where: { slug }, include: { brand: true, category: true, images: { orderBy: { sortOrder: "asc" } } } })
  ]);

  if (!product || !product.isActive) notFound();

  const related = await prisma.product.findMany({
    where: { isActive: true, categoryId: product.categoryId, id: { not: product.id } },
    include: { brand: true, category: true, images: true },
    take: 4
  });

  return (
    <main className="container-page py-12">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <ProductGallery images={product.images} />
        <ProductDetails product={product} whatsappNumber={settings.whatsappNumber} />
      </div>
      {related.length ? <FeaturedProducts products={related} whatsappNumber={settings.whatsappNumber} title="Productos relacionados" /> : null}
    </main>
  );
}
