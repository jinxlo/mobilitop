import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const faqSchema = z.object({ question: z.string().min(3), answer: z.string().min(3), isActive: z.coerce.boolean().default(true), sortOrder: z.coerce.number().int().default(0) });

export async function GET() {
  const faqs = await prisma.fAQ.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ success: true, data: faqs });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const parsed = faqSchema.parse({ ...raw, isActive: raw.isActive === "on" });
  await prisma.fAQ.create({ data: parsed });
  return NextResponse.redirect(new URL("/admin/faqs", request.url));
}
