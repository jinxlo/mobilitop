import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { prisma } from "@/lib/db";

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([prisma.category.findMany(), prisma.brand.findMany()]);
  return <div><AdminHeader title="Nuevo producto" /><ProductForm categories={categories} brands={brands} /></div>;
}
