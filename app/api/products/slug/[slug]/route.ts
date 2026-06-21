import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, include: { brand: true, category: true, images: true } });
  if (!product) return NextResponse.json({ success: false, error: "Producto no encontrado" }, { status: 404 });
  return NextResponse.json({ success: true, data: product });
}
