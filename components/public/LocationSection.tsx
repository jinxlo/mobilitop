import type { SiteSettings } from "@prisma/client";

export function LocationSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="container-page py-16">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black text-[#1E3A5F]">Ubicación y atención</h2>
          <p className="mt-4 leading-8 text-gray-700">{settings.address ?? "Configura la dirección desde el panel admin."}</p>
          <p className="mt-2 font-bold text-[#1E3A5F]">{settings.openingHours}</p>
        </div>
        <div className="min-h-64 rounded-[2rem] bg-[#F5EFE6] p-8 text-[#1E3A5F]">Mapa embebido configurable</div>
      </div>
    </section>
  );
}
