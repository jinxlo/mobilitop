import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slideSchema } from "@/lib/validators/slide";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = slideSchema.parse(await request.json());
  const slide = await prisma.heroSlide.update({ where: { id }, data: parsed });
  return NextResponse.json({ success: true, data: slide });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const parsed = slideSchema.parse({ ...raw, isActive: raw.isActive === "on" });
  await prisma.heroSlide.update({ where: { id }, data: parsed });
  return NextResponse.redirect(new URL("/admin/slides", request.url));
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.heroSlide.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
