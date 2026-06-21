import { AdminHeader } from "@/components/admin/AdminHeader";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { prisma } from "@/lib/db";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return <div><AdminHeader title="Categorías" /><CategoryForm /><div className="mt-6 grid gap-3">{categories.map((category) => <div className="rounded-2xl bg-white p-4" key={category.id}><b>{category.name}</b><span className="ml-3 text-sm text-gray-500">/{category.slug} · {category.isActive ? "Activa" : "Inactiva"}</span></div>)}</div></div>;
}
