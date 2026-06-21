import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const leadUpdateSchema = z.object({ status: z.enum(["NEW", "CONTACTED", "CLOSED", "DISCARDED"]).optional(), internalNotes: z.string().optional().nullable() });

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = leadUpdateSchema.parse(await request.json());
  const lead = await prisma.lead.update({ where: { id }, data: parsed });
  return NextResponse.json({ success: true, data: lead });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
