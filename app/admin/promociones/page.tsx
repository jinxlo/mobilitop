import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductTable } from "@/components/admin/ProductTable";
import { prisma } from "@/lib/db";

export default async function AdminPromotionsPage() {
  const products = await prisma.product.findMany({ where: { isPromotion: true }, include: { brand: true, category: true } });
  return <div><AdminHeader title="Promociones" /><ProductTable products={products} /></div>;
}
