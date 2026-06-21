import { ArrowRight, Palette, Ruler, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/shared/Button";

const steps = [
  { title: "Modelo", copy: "Sofá, base, cabecero, puff o proyecto especial.", icon: Ruler },
  { title: "Color y tela", copy: "Prueba opciones visuales antes de cotizar.", icon: Palette },
  { title: "WhatsApp", copy: "Envía el resumen completo para precio final.", icon: WhatsappLogo }
];

export function CustomConfiguratorSection() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="grid gap-8 overflow-hidden rounded-[2.5rem] bg-[#F5EFE6] p-8 shadow-xl md:grid-cols-[0.9fr_1.1fr] md:p-12">
        <div>
          <p className="font-black uppercase tracking-[0.2em] text-[#C9A24A]">Fabricación a medida</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#102A43] md:text-5xl">Diseña tu sofá o mueble personalizado</h2>
          <p className="mt-4 leading-8 text-slate-700">El cliente puede elegir modelo, medida, tela, color, patas y extras desde el teléfono. Luego ventas recibe una cotización completa por WhatsApp.</p>
          <Button className="mt-8" href="/configurador" variant="accent">
            Personalizar el mío <ArrowRight className="inline" size={18} weight="bold" />
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {steps.map(({ title, copy, icon: Icon }) => (
            <div className="rounded-3xl bg-white p-5" key={title}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1E3A5F] text-white"><Icon size={26} weight="duotone" /></div>
              <h3 className="mt-4 font-black text-[#1E3A5F]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
