import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadSchema } from "@/lib/validators/lead";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = leadSchema.parse(body);
  const lead = await prisma.lead.create({ data: { ...parsed, email: parsed.email || null, source: body.source ?? "website" } });
  return NextResponse.json({ success: true, data: lead }, { status: 201 });
}
