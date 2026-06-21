import { notFound } from "next/navigation";
import { ProductCard } from "@/components/public/ProductCard";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/tenant-config";

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, brand] = await Promise.all([getSiteSettings(), prisma.brand.findUnique({ where: { slug } })]);
  if (!brand) notFound();
  const products = await prisma.product.findMany({ where: { brandId: brand.id, isActive: true }, include: { brand: true, category: true, images: true } });

  return (
    <main className="container-page py-12">
      <h1 className="text-4xl font-black text-[#1E3A5F]">{brand.name}</h1>
      <p className="mt-3 max-w-2xl leading-8 text-gray-700">{brand.description}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard product={product} whatsappNumber={settings.whatsappNumber} key={product.id} />)}</div>
    </main>
  );
}
