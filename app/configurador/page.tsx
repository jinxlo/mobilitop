import { ConfiguratorBuilder } from "@/components/public/ConfiguratorBuilder";
import { createMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/tenant-config";

export const metadata = createMetadata({
  title: "Configurador de muebles a medida | Mobili Top",
  description: "Diseña tu sofá, base cama o mueble a medida y envía la cotización por WhatsApp.",
  path: "/configurador"
});

export default async function ConfiguratorPage() {
  const settings = await getSiteSettings();

  return (
    <main className="bg-[radial-gradient(circle_at_top_left,#fff7df_0,#fbfaf8_36%,#eef4fa_100%)] py-10 md:py-16">
      <div className="container-page">
        <section className="mb-8 max-w-4xl">
          <p className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#C9A24A] shadow-sm">Fabricamos a medida</p>
          <h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#102A43] md:text-7xl">Diseña tu sofá desde el teléfono</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl md:leading-9">
            Elige tipo de sofá, tela, color, entrega y presupuesto. Cada combinación del MVP ya tiene una imagen pre-creada para que el cliente vea el resultado antes de pedir cotización.
          </p>
        </section>
        <ConfiguratorBuilder whatsappNumber={settings.whatsappNumber} />
      </div>
    </main>
  );
}
