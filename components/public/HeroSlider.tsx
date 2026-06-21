import type { HeroSlide, SiteSettings } from "@prisma/client";
import Image from "next/image";
import { ArrowRight, Bed, CheckCircle, Sparkle, Truck } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/shared/Button";
import { getWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export function HeroSlider({ slides, settings }: { slides: HeroSlide[]; settings: SiteSettings }) {
  const first = slides[0];
  const title = first?.title ?? settings.heroTitle;
  const subtitle = first?.subtitle ?? settings.heroSubtitle;
  const imageUrl = first?.imageUrl ?? "/images/hero-1.png";

  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff7df_0,#f8efe3_32%,#eef4fa_70%,#fbfaf8_100%)] py-8 md:py-20">
      <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/3 rounded-full bg-[#C9A24A]/20 blur-3xl" />
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E3A5F]/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#1E3A5F] shadow-sm">
            <Sparkle size={16} weight="fill" className="text-[#C9A24A]" />
            Tienda especializada en descanso
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#102A43] sm:text-5xl md:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 md:text-xl md:leading-9">{subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={first?.buttonUrl ?? "/productos"} className="group">
              {first?.buttonLabel ?? "Ver catálogo"}
              <ArrowRight className="inline transition group-hover:translate-x-1" size={18} weight="bold" />
            </Button>
            <Button href={getWhatsAppUrl(settings.whatsappNumber, whatsappMessages.catalog)} variant="accent">
              Asesoría por WhatsApp
            </Button>
          </div>

          <div className="mt-8 grid max-w-2xl gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <b className="text-[#1E3A5F]">Medidas completas</b>
              <p className="mt-1 text-slate-600">Individual, matrimonial, queen y king.</p>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <b className="text-[#1E3A5F]">Compra guiada</b>
              <p className="mt-1 text-slate-600">Te ayudamos con firmeza, uso y presupuesto.</p>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <b className="text-[#1E3A5F]">Entrega coordinada</b>
              <p className="mt-1 text-slate-600">Retiro o delivery según zona.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[3rem] bg-[#1E3A5F]/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#102A43] p-4 text-white shadow-2xl">
            <div className="relative h-[360px] overflow-hidden rounded-[2rem] border border-white/15 sm:h-[460px] lg:h-[560px]">
              <Image src={imageUrl} alt={first?.title ?? "Showroom Mobili Top"} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-[#102A43]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-white/70">Descanso cómodo</p>
                <h2 className="mt-3 max-w-lg text-2xl font-black leading-none sm:text-4xl">Colchones, bases y accesorios para cada habitación</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/12 p-4 backdrop-blur">
                    <CheckCircle className="text-[#C9A24A]" size={22} weight="fill" />
                    <b className="mt-3 block">Catálogo listo</b>
                    <p className="mt-1 text-sm leading-6 text-white/65">Productos, categorías y promociones.</p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 text-[#102A43]">
                    <Truck size={28} weight="fill" className="text-[#2F7D5C]" />
                    <b className="mt-2 block">Consulta disponibilidad hoy</b>
                    <p className="text-sm text-slate-600">Precio, medida y delivery.</p>
                  </div>
                </div>
              </div>
              <div className="absolute right-5 top-5 grid h-16 w-16 place-items-center rounded-3xl bg-white text-[#1E3A5F] shadow-xl">
                <Bed size={34} weight="fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
