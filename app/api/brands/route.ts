import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { brandSchema } from "@/lib/validators/brand";

export async function GET() {
  const brands = await prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
  return NextResponse.json({ success: true, data: brands });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const parsed = brandSchema.parse({ ...raw, slug: raw.slug || slugify(String(raw.name)), isActive: raw.isActive === "on" });
  await prisma.brand.create({ data: { ...parsed, slug: parsed.slug ?? slugify(parsed.name) } });
  return NextResponse.redirect(new URL("/admin/marcas", request.url));
}
