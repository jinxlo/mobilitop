import type { SiteSettings } from "@prisma/client";
import Link from "next/link";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-[#102A43] py-14 text-white">
      <div className="container-page grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-lg font-black text-[#1E3A5F]">MT</span>
            <div>
              <h2 className="text-2xl font-black">{settings.businessName}</h2>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Descanso y confort</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">Catálogo administrable para colchones, bases, almohadas y productos de descanso con atención directa por WhatsApp.</p>
        </div>
        <div>
          <h3 className="font-black">Contacto</h3>
          <p className="mt-4 text-sm leading-7 text-white/65">{settings.phoneNumber}<br />{settings.email}<br />{settings.address}</p>
        </div>
        <div>
          <h3 className="font-black">Explorar</h3>
          <div className="mt-4 grid gap-2 text-sm text-white/65">
            <Link href="/productos">Productos</Link>
            <Link href="/promociones">Promociones</Link>
            <Link href="/garantia">Garantía</Link>
            <Link href="/contacto">Contacto</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black">Pagos</h3>
          <p className="mt-4 text-sm leading-7 text-white/65">{settings.paymentMethods.join(" · ")}</p>
          <p className="mt-5 text-xs leading-6 text-white/45">Precios, disponibilidad, garantía y entrega se confirman antes de cerrar la compra.</p>
        </div>
      </div>
    </footer>
  );
}
