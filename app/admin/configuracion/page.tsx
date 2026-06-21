import { AdminHeader } from "@/components/admin/AdminHeader";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSiteSettings } from "@/lib/tenant-config";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return <div><AdminHeader title="Configuración del sitio" /><SettingsForm settings={settings} /></div>;
}
