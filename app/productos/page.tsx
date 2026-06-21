import { ProductCard } from "@/components/public/ProductCard";
import { ProductFilters } from "@/components/public/ProductFilters";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/shared/Pagination";
import { prisma } from "@/lib/db";
import { createMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/tenant-config";

export const metadata = createMetadata({ title: "Productos | Mobili Top", description: "Catálogo de colchones, bases, almohadas y productos de descanso.", path: "/productos" });

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const [settings, categories, brands] = await Promise.all([getSiteSettings(), prisma.category.findMany({ where: { isActive: true } }), prisma.brand.findMany({ where: { isActive: true } })]);
  const selectedCategory = params.category ? await prisma.category.findUnique({ where: { slug: params.category } }) : null;
  const selectedBrand = params.brand ? await prisma.brand.findUnique({ where: { slug: params.brand } }) : null;
  const search = params.search ?? params.q;
  const page = Math.max(Number(params.page ?? 1), 1);
  const take = 12;
  const skip = (page - 1) * take;
  const where = {
    isActive: true,
    categoryId: selectedCategory?.id,
    brandId: selectedBrand?.id,
    mattressSize: params.mattressSize ? { contains: params.mattressSize, mode: "insensitive" as const } : undefined,
    firmness: params.firmness ? { contains: params.firmness, mode: "insensitive" as const } : undefined,
    mattressType: params.mattressType ? { contains: params.mattressType, mode: "insensitive" as const } : undefined,
    availabilityStatus: params.availability as never,
    isPromotion: params.promotion === "true" ? true : undefined,
    price: params.minPrice || params.maxPrice ? { gte: params.minPrice ? Number(params.minPrice) : undefined, lte: params.maxPrice ? Number(params.maxPrice) : undefined } : undefined,
    OR: search ? [{ name: { contains: search, mode: "insensitive" as const } }, { searchableContent: { contains: search, mode: "insensitive" as const } }] : undefined
  };

  const [products, totalProducts] = await Promise.all([prisma.product.findMany({
    where,
    include: { brand: true, category: true, images: true },
    orderBy: params.sort === "price_asc" ? { price: "asc" } : params.sort === "price_desc" ? { price: "desc" } : params.sort === "featured" ? { isFeatured: "desc" } : params.sort === "promotions" ? { isPromotion: "desc" } : { createdAt: "desc" },
    skip,
    take
  }), prisma.product.count({ where })]);

  return (
    <main className="container-page py-12">
      <h1 className="text-4xl font-black text-[#1E3A5F]">Catálogo de productos</h1>
      <p className="mt-3 max-w-2xl leading-8 text-gray-700">Filtra por categoría, marca, precio o disponibilidad y consulta por WhatsApp el producto que te interese.</p>
      <div className="mt-8"><ProductFilters categories={categories} brands={brands} params={params} /></div>
      {products.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard product={product} whatsappNumber={settings.whatsappNumber} key={product.id} />)}</div> : <EmptyState title="No hay productos con esos filtros" text="Prueba otra búsqueda o consulta por WhatsApp." />}
      <Pagination page={page} totalPages={Math.ceil(totalProducts / take)} basePath="/productos" />
    </main>
  );
}
