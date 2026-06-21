import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const leads = await prisma.lead.findMany({ include: { product: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ success: true, data: leads });
}
