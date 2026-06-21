import { AdminHeader } from "@/components/admin/AdminHeader";
import { LeadTable } from "@/components/admin/LeadTable";
import { prisma } from "@/lib/db";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ include: { product: true }, orderBy: { createdAt: "desc" } });
  return <div><AdminHeader title="Solicitudes" /><LeadTable leads={leads} /></div>;
}
