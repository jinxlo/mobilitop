import { AdminHeader } from "@/components/admin/AdminHeader";
import { BrandForm } from "@/components/admin/BrandForm";
import { prisma } from "@/lib/db";

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  return <div><AdminHeader title="Marcas" /><BrandForm /><div className="mt-6 grid gap-3">{brands.map((brand) => <div className="rounded-2xl bg-white p-4" key={brand.id}><b>{brand.name}</b><span className="ml-3 text-sm text-gray-500">/{brand.slug} · {brand.isActive ? "Activa" : "Inactiva"}</span></div>)}</div></div>;
}
