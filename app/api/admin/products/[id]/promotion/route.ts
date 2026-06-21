import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const current = await prisma.product.findUniqueOrThrow({ where: { id } });
  const body = await request.json().catch(() => ({}));
  const product = await prisma.product.update({
    where: { id },
    data: {
      isPromotion: typeof body.isPromotion === "boolean" ? body.isPromotion : !current.isPromotion,
      price: body.price ?? undefined,
      previousPrice: body.previousPrice ?? undefined
    }
  });
  return NextResponse.json({ success: true, data: product });
}
