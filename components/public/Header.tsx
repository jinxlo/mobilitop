import type { SiteSettings } from "@prisma/client";
import Link from "next/link";
import { getWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";
import { MobileMenu } from "@/components/public/MobileMenu";

const links = [
  ["Inicio", "/"],
  ["Productos", "/productos"],
  ["Configurador", "/configurador"],
  ["Colchones", "/categorias/colchones"],
  ["Bases", "/categorias/bases"],
  ["Almohadas", "/categorias/almohadas"],
  ["Promociones", "/promociones"],
  ["Nosotros", "/nosotros"],
  ["Contacto", "/contacto"]
];

export function Header({ settings }: { settings: SiteSettings }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1E3A5F]/10 bg-white/90 backdrop-blur-xl">
      <div className="bg-[#102A43] py-2 text-xs font-semibold text-white/85">
        <div className="container-page flex flex-wrap items-center justify-between gap-2">
          <span>{settings.openingHours ?? "Atención personalizada"}</span>
          <span>{settings.address ?? "Consulta disponibilidad por WhatsApp"}</span>
          <a className="font-black text-white" href={`tel:${settings.phoneNumber ?? settings.whatsappNumber}`}>{settings.phoneNumber ?? settings.whatsappNumber}</a>
        </div>
      </div>
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link className="group flex items-center gap-3" href="/" aria-label={`${settings.businessName} inicio`}>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1E3A5F] text-lg font-black text-white shadow-lg">MT</span>
          <span>
            <span className="block text-2xl font-black tracking-tight text-[#1E3A5F]">{settings.businessName}</span>
            <span className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Descanso y confort</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-bold text-slate-700 lg:flex" aria-label="Navegación principal">
          {links.map(([label, href]) => (
            <Link className="transition hover:text-[#1E3A5F]" href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <a className="rounded-full bg-[#2F7D5C] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#25674c]" href={getWhatsAppUrl(settings.whatsappNumber, whatsappMessages.catalog)} target="_blank">
            WhatsApp
          </a>
        </div>
        <MobileMenu links={links} />
      </div>
    </header>
  );
}
