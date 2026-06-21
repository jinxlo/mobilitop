import { ArrowRight, PlayCircle, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/shared/Button";

export function VideoShowcaseSection() {
  return (
    <section className="bg-[#102A43] py-16 text-white md:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#C9A24A]">
            <Sparkle size={16} weight="fill" /> Experiencia animada
          </p>
          <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-6xl">Mira cómo se siente Mobili Top</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
            Integramos video en la página para que el sitio se sienta más vivo, moderno y cercano desde el primer scroll.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/configurador" variant="accent">Diseñar sofá <ArrowRight className="inline" size={18} weight="bold" /></Button>
            <Button href="/productos" variant="outline">Ver catálogo</Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[3rem] bg-[#C9A24A]/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-3 shadow-2xl">
            <video
              className="aspect-video w-full rounded-[2rem] bg-black object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/mobilitop-showcase-poster.jpg"
              aria-label="Video animado de Mobili Top"
            >
              <source src="/videos/mobilitop-showcase.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 rounded-3xl bg-[#102A43]/72 p-4 backdrop-blur">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C9A24A]">Video destacado</p>
                <p className="mt-1 font-black">Diseño, confort y fabricación a medida</p>
              </div>
              <PlayCircle size={42} weight="fill" className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
