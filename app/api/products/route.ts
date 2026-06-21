import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const products = await prisma.product.findMany({ where: { isActive: true }, include: { brand: true, category: true, images: true }, orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ success: true, data: products });
}
