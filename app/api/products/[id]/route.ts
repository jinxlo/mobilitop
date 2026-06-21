import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { productSchema, searchableProductContent } from "@/lib/validators/product";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id }, include: { brand: true, category: true, images: true } });
  if (!product) return NextResponse.json({ success: false, error: "Producto no encontrado" }, { status: 404 });
  return NextResponse.json({ success: true, data: product });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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
  await prisma.product.update({ where: { id }, data: { ...parsed, slug: parsed.slug ?? slugify(parsed.name), searchableContent: searchableProductContent(parsed) } });
  return NextResponse.redirect(new URL("/admin/productos", request.url));
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
