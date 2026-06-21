import type { Lead, Product } from "@prisma/client";

export function LeadTable({ leads }: { leads: (Lead & { product: Product | null })[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#F5EFE6] text-[#1E3A5F]"><tr><th className="p-4">Nombre</th><th>Teléfono</th><th>Producto</th><th>Estado</th><th>Fecha</th></tr></thead>
        <tbody>{leads.map((lead) => <tr className="border-t" key={lead.id}><td className="p-4 font-bold">{lead.name}</td><td>{lead.phone}</td><td>{lead.product?.name ?? "General"}</td><td>{lead.status}</td><td>{lead.createdAt.toLocaleDateString("es-VE")}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
