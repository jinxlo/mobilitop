import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/shared/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppCTA({ phone, message, title = "¿Necesitas ayuda para elegir?" }: { phone: string; message: string; title?: string }) {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[#2F7D5C] p-8 text-white shadow-2xl md:p-12">
        <div className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
              <WhatsappLogo size={18} weight="fill" />
              Atención directa
            </div>
            <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-[-0.035em] md:text-5xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">Envíanos medida, presupuesto y tipo de descanso. Te respondemos con opciones concretas y disponibilidad.</p>
          </div>
          <Button className="justify-center whitespace-nowrap" href={getWhatsAppUrl(phone, message)} variant="light">
            Escribir por WhatsApp <ArrowRight className="inline" size={18} weight="bold" />
          </Button>
        </div>
      </div>
    </section>
  );
}
