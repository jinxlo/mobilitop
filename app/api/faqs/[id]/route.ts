import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const faqSchema = z.object({ question: z.string().min(3), answer: z.string().min(3), isActive: z.coerce.boolean().default(true), sortOrder: z.coerce.number().int().default(0) });

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const parsed = faqSchema.parse({ ...raw, isActive: raw.isActive === "on" });
  await prisma.fAQ.update({ where: { id }, data: parsed });
  return NextResponse.redirect(new URL("/admin/faqs", request.url));
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.fAQ.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
