import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { productSchema, searchableProductContent } from "@/lib/validators/product";

export async function GET() {
  const products = await prisma.product.findMany({ include: { brand: true, category: true, images: true }, orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ success: true, data: products });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const parsed = productSchema.parse({
    ...raw,
    slug: raw.slug || slugify(String(raw.name)),
    brandId: raw.brandId || null,
    isActive: raw.isActive === "on",
    isFeatured: raw.isFeatured === "on",
    isPromotion: raw.isPromotion === "on",
    previousPrice: raw.previousPrice || null,
    features: String(raw.features ?? "").split("\n").map((item) => item.trim()).filter(Boolean),
    materials: String(raw.materials ?? "").split("\n").map((item) => item.trim()).filter(Boolean)
  });
  const product = await prisma.product.create({ data: { ...parsed, slug: parsed.slug ?? slugify(parsed.name), searchableContent: searchableProductContent(parsed) } });
  return NextResponse.redirect(new URL(`/admin/productos/${product.id}/editar`, request.url));
}
