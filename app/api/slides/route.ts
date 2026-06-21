import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slideSchema } from "@/lib/validators/slide";

export async function GET() {
  const slides = await prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ success: true, data: slides });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const activeCount = await prisma.heroSlide.count({ where: { isActive: true } });
  const parsed = slideSchema.parse({ ...raw, isActive: raw.isActive === "on" && activeCount < 5 });
  await prisma.heroSlide.create({ data: parsed });
  return NextResponse.redirect(new URL("/admin/slides", request.url));
}
