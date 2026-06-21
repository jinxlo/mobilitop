import { AdminHeader } from "@/components/admin/AdminHeader";
import { prisma } from "@/lib/db";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return <div><AdminHeader title="Usuarios" /><div className="grid gap-3">{users.map((user) => <div className="rounded-2xl bg-white p-4" key={user.id}><b>{user.name}</b><span className="ml-3 text-sm text-gray-500">{user.email} · {user.role} · {user.isActive ? "Activo" : "Inactivo"}</span></div>)}</div></div>;
}
