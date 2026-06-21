import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { categorySchema } from "@/lib/validators/category";

export async function GET() {
  const categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ success: true, data: categories });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const parsed = categorySchema.parse({ ...raw, slug: raw.slug || slugify(String(raw.name)), isActive: raw.isActive === "on" });
  await prisma.category.create({ data: { ...parsed, slug: parsed.slug ?? slugify(parsed.name) } });
  return NextResponse.redirect(new URL("/admin/categorias", request.url));
}
