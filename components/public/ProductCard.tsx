import type { Brand, Category, Product, ProductImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { firstImage, formatMoney } from "@/lib/utils";
import { getWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

type ProductWithRelations = Product & { brand: Brand | null; category: Category; images: ProductImage[] };

export function ProductCard({ product, whatsappNumber }: { product: ProductWithRelations; whatsappNumber: string }) {
  const image = firstImage(product.images);

  return (
    <article className="soft-card flex h-full flex-col overflow-hidden rounded-3xl transition active:scale-[0.99] md:active:scale-100">
      <Link className="relative block h-48 overflow-hidden bg-[#F5EFE6] sm:h-56" href={`/productos/${product.slug}`} aria-label={product.name}>
        <Image src={image} alt={product.images[0]?.altText ?? product.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-300 hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {product.isPromotion ? <Badge className="bg-[#C9A24A] text-[#1F2937]">Promoción</Badge> : null}
          <Badge>{product.availabilityStatus === "OUT_OF_STOCK" ? "Agotado" : "Disponible"}</Badge>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">{product.brand?.name ?? "Marca"} · {product.category.name}</p>
        <h3 className="mt-2 text-lg font-black leading-tight text-[#1E3A5F] sm:text-xl">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-600">{product.mattressSize ?? product.mattressType ?? "Consulta medidas disponibles"}</p>
        <div className="mt-4 flex items-baseline gap-2">
          <strong className="text-2xl text-[#1E3A5F]">{formatMoney(product.price.toString(), product.currency)}</strong>
          {product.previousPrice ? <span className="text-sm text-gray-400 line-through">{formatMoney(product.previousPrice.toString(), product.currency)}</span> : null}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button href={`/productos/${product.slug}`} variant="outline" className="px-3 py-3 text-xs sm:px-4 sm:text-sm">Ver detalle</Button>
          <Button href={getWhatsAppUrl(whatsappNumber, whatsappMessages.product(product.name))} variant="accent" className="px-3 py-3 text-xs sm:px-4 sm:text-sm">Consultar</Button>
        </div>
      </div>
    </article>
  );
}
