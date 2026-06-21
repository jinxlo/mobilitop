import { notFound } from "next/navigation";
import { ProductCard } from "@/components/public/ProductCard";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/tenant-config";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, category] = await Promise.all([getSiteSettings(), prisma.category.findUnique({ where: { slug } })]);
  if (!category) notFound();
  const products = await prisma.product.findMany({ where: { categoryId: category.id, isActive: true }, include: { brand: true, category: true, images: true } });

  return (
    <main className="container-page py-12">
      <h1 className="text-4xl font-black text-[#1E3A5F]">{category.name}</h1>
      <p className="mt-3 max-w-2xl leading-8 text-gray-700">{category.description}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard product={product} whatsappNumber={settings.whatsappNumber} key={product.id} />)}</div>
    </main>
  );
}
