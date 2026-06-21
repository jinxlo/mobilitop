import { Brain, ChatCircleDots, Database, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

const stats = [
  { value: "+50", label: "productos configurables", icon: Database },
  { value: "24h", label: "respuesta rápida por WhatsApp", icon: ChatCircleDots },
  { value: "100%", label: "catálogo administrable", icon: ShieldCheck },
  { value: "AI", label: "API lista para asistentes", icon: Brain }
];

export function TrustBadges() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="grid gap-4 rounded-[2.5rem] bg-[#1E3A5F] p-6 text-white shadow-2xl md:grid-cols-4 md:p-8">
        {stats.map(({ value, label, icon: Icon }) => (
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6" key={label}>
            <Icon size={30} weight="duotone" className="text-[#C9A24A]" />
            <strong className="mt-5 block text-4xl font-black tracking-[-0.05em]">{value}</strong>
            <p className="mt-2 text-sm font-bold leading-6 text-white/70">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
