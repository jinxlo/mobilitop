import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { brandSchema } from "@/lib/validators/brand";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = brandSchema.parse(await request.json());
  const brand = await prisma.brand.update({ where: { id }, data: { ...parsed, slug: parsed.slug ?? slugify(parsed.name) } });
  return NextResponse.json({ success: true, data: brand });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const parsed = brandSchema.parse({ ...raw, slug: raw.slug || slugify(String(raw.name)), isActive: raw.isActive === "on" });
  await prisma.brand.update({ where: { id }, data: { ...parsed, slug: parsed.slug ?? slugify(parsed.name) } });
  return NextResponse.redirect(new URL("/admin/marcas", request.url));
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.brand.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
