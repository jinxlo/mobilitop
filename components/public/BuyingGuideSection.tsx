import { ArrowRight, Bed, CheckSquare, CurrencyDollar, Palette, Ruler } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/shared/Button";

const questions = [
  { title: "Medida", copy: "Individual, matrimonial, queen, king o medida especial.", icon: Ruler },
  { title: "Firmeza", copy: "Suave, semi-firme, firme u ortopédico según tu descanso.", icon: Bed },
  { title: "Presupuesto", copy: "Te mostramos opciones buenas sin perder tiempo.", icon: CurrencyDollar },
  { title: "Entrega", copy: "Validamos disponibilidad, zona, retiro o delivery.", icon: CheckSquare },
  { title: "A medida", copy: "Personaliza sofá, base o cabecero con color, tela y extras.", icon: Palette }
];

export function BuyingGuideSection({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="overflow-hidden rounded-[2.5rem] bg-[#102A43] text-white shadow-2xl">
        <div className="grid gap-8 p-8 md:grid-cols-[0.9fr_1.1fr] md:p-12">
          <div>
            <p className="font-black uppercase tracking-[0.2em] text-[#C9A24A]">Guía de compra</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] md:text-5xl">Te ayudamos a elegir sin complicarte</h2>
            <p className="mt-4 leading-8 text-white/70">Si no sabes qué colchón escoger, responde unas preguntas y ventas recibe el contexto listo para asesorarte.</p>
            <Button className="mt-8" href="/configurador" variant="accent">
              Diseñar y cotizar <ArrowRight className="inline" size={18} weight="bold" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {questions.map(({ title, copy, icon: Icon }) => (
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5" key={title}>
                <Icon size={28} weight="duotone" className="text-[#C9A24A]" />
                <h3 className="mt-4 font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
