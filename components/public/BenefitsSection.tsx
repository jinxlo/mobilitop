import { ChatCircleText, CheckCircle, CreditCard, Ruler, Truck } from "@phosphor-icons/react/dist/ssr";

const benefits = [
  { title: "Asesoría personalizada", copy: "Te orientamos por WhatsApp según medida, firmeza, peso, presupuesto y forma de dormir.", icon: ChatCircleText },
  { title: "Variedad de medidas", copy: "Individual, matrimonial, queen, king y opciones especiales según disponibilidad.", icon: Ruler },
  { title: "Entrega coordinada", copy: "Retiro o delivery según zona, producto y disponibilidad confirmada antes de comprar.", icon: Truck },
  { title: "Opciones de pago", copy: "Pago móvil, transferencia, Zelle, efectivo u otros métodos configurables por tienda.", icon: CreditCard },
  { title: "Garantía clara", copy: "Cada producto informa condiciones de garantía antes de cerrar la compra.", icon: CheckCircle }
];

export function BenefitsSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="font-black uppercase tracking-[0.2em] text-[#C9A24A]">Por qué Mobili Top</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#1E3A5F] md:text-5xl">Comprar descanso debe ser simple y confiable</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">El sitio está diseñado para que el cliente llegue rápido al producto correcto y hable con ventas con contexto.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {benefits.map(({ title, copy, icon: Icon }) => (
            <div className="rounded-[2rem] border border-[#1E3A5F]/10 bg-[#FBFAF8] p-6" key={title}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1E3A5F] text-white">
                <Icon size={26} weight="duotone" />
              </div>
              <h3 className="mt-5 font-black text-[#1E3A5F]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
