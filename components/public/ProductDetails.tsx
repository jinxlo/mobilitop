import type { Brand, Category, Product } from "@prisma/client";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { formatMoney } from "@/lib/utils";
import { getWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export function ProductDetails({ product, whatsappNumber }: { product: Product & { brand: Brand | null; category: Category }; whatsappNumber: string }) {
  return (
    <div className="soft-card rounded-[2rem] p-6 md:p-8">
      <div className="flex flex-wrap gap-2">
        <Badge>{product.category.name}</Badge>
        {product.brand ? <Badge>{product.brand.name}</Badge> : null}
        {product.isPromotion ? <Badge className="bg-[#C9A24A] text-[#1F2937]">Promoción</Badge> : null}
      </div>
      <h1 className="mt-5 text-4xl font-black leading-tight text-[#1E3A5F]">{product.name}</h1>
      <p className="mt-4 text-lg leading-8 text-gray-700">{product.shortDescription}</p>
      <div className="mt-6 flex items-baseline gap-3">
        <strong className="text-4xl text-[#1E3A5F]">{formatMoney(product.price.toString(), product.currency)}</strong>
        {product.previousPrice ? <span className="text-lg text-gray-400 line-through">{formatMoney(product.previousPrice.toString(), product.currency)}</span> : null}
      </div>
      <Button className="mt-7 w-full" href={getWhatsAppUrl(whatsappNumber, whatsappMessages.product(product.name))} variant="accent">Consultar este producto por WhatsApp</Button>
      <dl className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-2xl bg-[#F5EFE6] p-4"><dt className="font-bold">Medida</dt><dd>{product.mattressSize ?? "Consultar"}</dd></div>
        <div className="rounded-2xl bg-[#F5EFE6] p-4"><dt className="font-bold">Firmeza</dt><dd>{product.firmness ?? "Consultar"}</dd></div>
        <div className="rounded-2xl bg-[#F5EFE6] p-4"><dt className="font-bold">Tipo</dt><dd>{product.mattressType ?? "Consultar"}</dd></div>
        <div className="rounded-2xl bg-[#F5EFE6] p-4"><dt className="font-bold">Disponibilidad</dt><dd>{product.availabilityStatus}</dd></div>
      </dl>
      <div className="mt-8 space-y-5">
        <section><h2 className="font-black text-[#1E3A5F]">Descripción</h2><p className="mt-2 leading-7 text-gray-700">{product.longDescription}</p></section>
        <section><h2 className="font-black text-[#1E3A5F]">Características</h2><ul className="mt-2 list-inside list-disc text-gray-700">{product.features.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h2 className="font-black text-[#1E3A5F]">Garantía</h2><p className="mt-2 text-gray-700">{product.warranty ?? "Consultar condiciones de garantía."}</p></section>
      </div>
    </div>
  );
}
