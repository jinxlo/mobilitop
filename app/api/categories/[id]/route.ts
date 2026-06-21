import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { categorySchema } from "@/lib/validators/category";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const parsed = categorySchema.parse(body);
  const category = await prisma.category.update({ where: { id }, data: { ...parsed, slug: parsed.slug ?? slugify(parsed.name) } });
  return NextResponse.json({ success: true, data: category });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const parsed = categorySchema.parse({ ...raw, slug: raw.slug || slugify(String(raw.name)), isActive: raw.isActive === "on" });
  await prisma.category.update({ where: { id }, data: { ...parsed, slug: parsed.slug ?? slugify(parsed.name) } });
  return NextResponse.redirect(new URL("/admin/categorias", request.url));
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
