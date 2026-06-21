import { LocationSection } from "@/components/public/LocationSection";
import { WhatsAppCTA } from "@/components/public/WhatsAppCTA";
import { Button } from "@/components/shared/Button";
import { getSiteSettings } from "@/lib/tenant-config";
import { whatsappMessages } from "@/lib/whatsapp";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <main className="py-12">
      <section className="container-page grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl font-black text-[#1E3A5F]">Contacto</h1>
          <p className="mt-4 leading-8 text-gray-700">Escríbenos para consultar productos, disponibilidad, delivery, promociones o medidas especiales.</p>
          <div className="mt-6"><Button href="/api/leads" variant="outline">Formulario disponible vía API</Button></div>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <p><b>Teléfono:</b> {settings.phoneNumber}</p>
          <p className="mt-3"><b>Email:</b> {settings.email}</p>
          <p className="mt-3"><b>Dirección:</b> {settings.address}</p>
          <p className="mt-3"><b>Horario:</b> {settings.openingHours}</p>
        </div>
      </section>
      <WhatsAppCTA phone={settings.whatsappNumber} message={whatsappMessages.catalog} />
      <LocationSection settings={settings} />
    </main>
  );
}
