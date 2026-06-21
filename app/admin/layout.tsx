import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="grid min-h-screen bg-[#F4F4F5] lg:grid-cols-[260px_1fr]"><AdminSidebar /><main className="p-6 lg:p-10">{children}</main></div>;
}
