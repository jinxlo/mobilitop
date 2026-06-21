import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductTable } from "@/components/admin/ProductTable";
import { prisma } from "@/lib/db";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ include: { brand: true, category: true }, orderBy: { updatedAt: "desc" } });
  return <div><AdminHeader title="Productos" /><Link className="mb-5 inline-flex rounded-full bg-[#1E3A5F] px-5 py-3 font-bold text-white" href="/admin/productos/nuevo">Nuevo producto</Link><ProductTable products={products} /></div>;
}
