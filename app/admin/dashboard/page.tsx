import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const [total, active, noImage, promo, leads, latest] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.product.count({ where: { images: { none: {} } } }),
    prisma.product.count({ where: { isPromotion: true } }),
    prisma.lead.count(),
    prisma.product.findMany({ orderBy: { createdAt: "desc" }, take: 5 })
  ]);
  const stats = [["Total productos", total], ["Activos", active], ["Sin imagen", noImage], ["Promoción", promo], ["Solicitudes", leads]];
  return (
    <div>
      <AdminHeader title="Dashboard" />
      <div className="grid gap-4 md:grid-cols-5">{stats.map(([label, value]) => <div className="rounded-3xl bg-white p-5" key={label}><p className="text-sm text-gray-500">{label}</p><strong className="text-3xl text-[#1E3A5F]">{value}</strong></div>)}</div>
      <Link className="mt-8 inline-flex rounded-full bg-[#C9A24A] px-6 py-3 font-bold text-[#1F2937]" href="/admin/productos/nuevo">Nuevo producto</Link>
      <div className="mt-8 rounded-3xl bg-white p-6"><h2 className="font-black text-[#1E3A5F]">Últimos productos</h2>{latest.map((product) => <p className="mt-3" key={product.id}>{product.name}</p>)}</div>
    </div>
  );
}
