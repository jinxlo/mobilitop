import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const current = await prisma.product.findUniqueOrThrow({ where: { id } });
  const product = await prisma.product.update({ where: { id }, data: { isActive: !current.isActive } });
  return NextResponse.json({ success: true, data: product });
}
