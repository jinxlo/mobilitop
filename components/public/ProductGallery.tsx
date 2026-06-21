import type { ProductImage } from "@prisma/client";
import Image from "next/image";
import { firstImage } from "@/lib/utils";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const gallery = images.length ? images : [{ id: "placeholder", imageUrl: "/images/product-placeholder.png", productId: "", altText: "Producto", sortOrder: 0, isMain: true, createdAt: new Date() }];
  const main = firstImage(gallery);

  return (
    <div>
      <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-[#F5EFE6]">
        <Image src={main} alt={gallery[0]?.altText ?? "Producto"} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {gallery.map((image) => (
          <div className="relative h-24 overflow-hidden rounded-2xl bg-[#F5EFE6]" key={image.id} title={image.altText ?? "Imagen del producto"}>
            <Image src={image.imageUrl} alt={image.altText ?? "Imagen del producto"} fill sizes="25vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
