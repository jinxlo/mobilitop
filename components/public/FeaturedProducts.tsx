import type { Brand, Category, Product, ProductImage } from "@prisma/client";
import Link from "next/link";
import { ArrowRight, Package, Star } from "@phosphor-icons/react/dist/ssr";
import { ProductCard } from "@/components/public/ProductCard";
import { EmptyState } from "@/components/shared/EmptyState";

type ProductWithRelations = Product & { brand: Brand | null; category: Category; images: ProductImage[] };

export function FeaturedProducts({ products, whatsappNumber, title = "Productos destacados" }: { products: ProductWithRelations[]; whatsappNumber: string; title?: string }) {
  const isPromo = title.toLowerCase().includes("promo");

  return (
    <section className="container-page py-16 md:py-20">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-[#F5EFE6] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#1E3A5F]">
            <Star size={15} weight="fill" className="text-[#C9A24A]" />
            {isPromo ? "Ofertas" : "Catálogo"}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#1E3A5F] md:text-5xl">{title}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Productos seleccionados para comparar medidas, firmezas y presupuesto antes de escribir por WhatsApp.
          </p>
        </div>
        <Link className="inline-flex items-center gap-2 font-black text-[#1E3A5F]" href={isPromo ? "/promociones" : "/productos"}>
          Ver todos <ArrowRight size={18} weight="bold" />
        </Link>
      </div>

      {products.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} whatsappNumber={whatsappNumber} />)}
        </div>
      ) : (
        <EmptyState icon={<Package size={34} weight="duotone" />} title="Todavía no hay productos para mostrar" description="Agrega productos desde el panel admin para activar esta sección automáticamente." />
      )}
    </section>
  );
}
