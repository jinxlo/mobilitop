import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { prisma } from "@/lib/db";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories, brands] = await Promise.all([prisma.product.findUnique({ where: { id } }), prisma.category.findMany(), prisma.brand.findMany()]);
  if (!product) notFound();
  return <div><AdminHeader title="Editar producto" /><ProductForm product={product} categories={categories} brands={brands} /></div>;
}
