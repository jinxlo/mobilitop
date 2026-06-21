"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, Couch, Palette, Truck, WhatsappLogo } from "@phosphor-icons/react";
import {
  couchBudgetOptions,
  couchColors,
  couchDeliveryOptions,
  couchFabrics,
  couchImagePath,
  couchModels,
  couchToConfiguratorInput,
  getDefaultCouchConfig,
  type CouchConfiguratorInput
} from "@/lib/configurator/couch-options";
import { buildConfiguratorWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Tipo de sofá", subtitle: "Primero elige la estructura principal." },
  { title: "Material", subtitle: "Selecciona la tela que quieres cotizar." },
  { title: "Color", subtitle: "El preview usa una imagen pre-creada para esta combinación." },
  { title: "Entrega", subtitle: "Indica cómo quieres recibirlo y tu rango de presupuesto." },
  { title: "Resultado", subtitle: "Revisa el sofá generado y envía la cotización." }
];

function Choice({ selected, children, onClick }: { selected: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "relative min-h-20 rounded-[1.6rem] border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-[#C9A24A]",
        selected ? "border-[#1E3A5F] bg-[#1E3A5F] text-white shadow-xl" : "border-slate-200 bg-white text-[#102A43] shadow-sm hover:-translate-y-0.5 hover:border-[#1E3A5F]/40 hover:shadow-lg"
      )}
    >
      {selected ? <CheckCircle className="absolute right-4 top-4 text-[#C9A24A]" size={24} weight="fill" /> : null}
      {children}
    </button>
  );
}

export function ConfiguratorBuilder({ whatsappNumber }: { whatsappNumber: string }) {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<CouchConfiguratorInput>(getDefaultCouchConfig());
  const selectedImage = couchImagePath(config);
  const selectedColor = couchColors.find((item) => item.id === config.color) ?? couchColors[0];
  const selectedModel = couchModels.find((item) => item.id === config.model) ?? couchModels[0];
  const selectedFabric = couchFabrics.find((item) => item.id === config.fabric) ?? couchFabrics[0];
  const quoteInput = useMemo(() => couchToConfiguratorInput(config), [config]);
  const whatsappUrl = getWhatsAppUrl(whatsappNumber, buildConfiguratorWhatsAppMessage(quoteInput));
  const progress = Math.round(((step + 1) / steps.length) * 100);

  function update<K extends keyof CouchConfiguratorInput>(key: K, value: CouchConfiguratorInput[K]) {
    setConfig((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(380px,0.58fr)] lg:items-start">
      <section className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-[#1E3A5F]/10">
        <div className="bg-[#102A43] p-5 text-white md:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C9A24A]">Configurador de sofás</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] md:text-5xl">{steps[step].title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">{steps[step].subtitle}</p>
            </div>
            <div className="hidden h-16 w-16 place-items-center rounded-3xl bg-white/10 md:grid"><Couch size={34} weight="duotone" /></div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-[#C9A24A] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-4 flex gap-2">
            {steps.map((item, index) => <button type="button" onClick={() => setStep(index)} aria-label={item.title} className={cn("h-2 flex-1 rounded-full", index <= step ? "bg-[#C9A24A]" : "bg-white/20")} key={item.title} />)}
          </div>
        </div>

        <div className="min-h-[500px] p-5 md:p-8">
          {step === 0 ? (
            <div className="grid gap-4">
              {couchModels.map((model) => (
                <Choice selected={config.model === model.id} onClick={() => update("model", model.id)} key={model.id}>
                  <span className="pr-8 text-xl font-black">{model.label}</span>
                  <span className={cn("mt-2 block leading-6", config.model === model.id ? "text-white/75" : "text-slate-600")}>{model.copy}</span>
                </Choice>
              ))}
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-4">
              {couchFabrics.map((fabric) => (
                <Choice selected={config.fabric === fabric.id} onClick={() => update("fabric", fabric.id)} key={fabric.id}>
                  <span className="pr-8 text-xl font-black">{fabric.label}</span>
                  <span className={cn("mt-2 block leading-6", config.fabric === fabric.id ? "text-white/75" : "text-slate-600")}>{fabric.copy}</span>
                </Choice>
              ))}
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {couchColors.map((color) => (
                <button type="button" aria-pressed={config.color === color.id} onClick={() => update("color", color.id)} className={cn("rounded-[1.6rem] border bg-white p-4 text-left transition hover:-translate-y-0.5", config.color === color.id ? "border-[#1E3A5F] ring-2 ring-[#C9A24A]" : "border-slate-200")} key={color.id}>
                  <span className="block h-28 rounded-[1.2rem] border border-black/10" style={{ background: color.value }} />
                  <span className="mt-4 block text-lg font-black text-[#1E3A5F]">{color.label}</span>
                </button>
              ))}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-3 flex items-center gap-2 font-black text-[#1E3A5F]"><Truck size={22} weight="duotone" /> Entrega</p>
                <div className="grid gap-3">{couchDeliveryOptions.map((item) => <Choice selected={config.delivery === item} onClick={() => update("delivery", item)} key={item}>{item}</Choice>)}</div>
              </div>
              <div>
                <p className="mb-3 font-black text-[#1E3A5F]">Presupuesto</p>
                <div className="grid gap-3">{couchBudgetOptions.map((item) => <Choice selected={config.budget === item} onClick={() => update("budget", item)} key={item}>{item}</Choice>)}</div>
              </div>
              <label className="grid gap-2 text-sm font-black text-[#1E3A5F] md:col-span-2">
                Notas opcionales
                <textarea value={config.notes} onChange={(event) => update("notes", event.target.value)} maxLength={500} className="min-h-28 rounded-[1.4rem] border border-slate-200 px-4 py-3 font-normal text-slate-700 outline-none focus:ring-2 focus:ring-[#C9A24A]" placeholder="Ej: medidas aproximadas, brazos más anchos, referencia de foto, ciudad/zona..." />
              </label>
            </div>
          ) : null}

          {step === 4 ? (
            <div>
              <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-[#F5EFE6]">
                <div className="relative aspect-[4/3]">
                  <Image src={selectedImage} alt={`${selectedModel.label} ${selectedFabric.label} ${selectedColor.label}`} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
                </div>
              </div>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["Producto", selectedModel.label],
                  ["Tela", selectedFabric.label],
                  ["Color", selectedColor.label],
                  ["Entrega", config.delivery],
                  ["Presupuesto", config.budget]
                ].map(([label, value]) => (
                  <div className="rounded-2xl bg-[#F5EFE6] p-4" key={label}>
                    <dt className="text-xs font-black uppercase tracking-[0.16em] text-[#C9A24A]">{label}</dt>
                    <dd className="mt-1 font-black text-[#1E3A5F]">{value}</dd>
                  </div>
                ))}
              </dl>
              <a href={whatsappUrl} target="_blank" className="mt-6 flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#2F7D5C] px-6 py-4 text-center font-black text-white shadow-xl transition hover:bg-[#25674c]">
                <WhatsappLogo size={22} weight="fill" /> Enviar este sofá por WhatsApp <ArrowRight size={18} weight="bold" />
              </a>
            </div>
          ) : null}
        </div>

        <div className="sticky bottom-0 z-10 flex items-center justify-between gap-3 border-t border-slate-100 bg-white/95 p-4 backdrop-blur md:p-5">
          <button type="button" onClick={() => setStep((value) => Math.max(value - 1, 0))} disabled={step === 0} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-200 px-5 font-black text-[#1E3A5F] disabled:cursor-not-allowed disabled:opacity-40">
            <ArrowLeft size={18} weight="bold" /> Atrás
          </button>
          {step < steps.length - 1 ? (
            <button type="button" onClick={() => setStep((value) => Math.min(value + 1, steps.length - 1))} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1E3A5F] px-6 font-black text-white shadow-lg">
              Siguiente <ArrowRight size={18} weight="bold" />
            </button>
          ) : (
            <a href={whatsappUrl} target="_blank" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#2F7D5C] px-6 font-black text-white shadow-lg">
              WhatsApp <WhatsappLogo size={18} weight="fill" />
            </a>
          )}
        </div>
      </section>

      <aside className="lg:sticky lg:top-28">
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-[#1E3A5F]/10">
          <div className="relative aspect-square bg-[#F5EFE6]">
            <Image src={selectedImage} alt={`Preview ${selectedModel.label}`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#1E3A5F] backdrop-blur">Imagen pre-creada</div>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3">
              <Palette size={26} weight="duotone" className="mt-1 flex-none text-[#C9A24A]" />
              <div>
                <h3 className="text-2xl font-black text-[#102A43]">{selectedModel.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{selectedFabric.label} · {selectedColor.label} · {config.delivery}</p>
              </div>
            </div>
            <p className="mt-5 rounded-2xl bg-[#F5EFE6] p-4 text-sm leading-6 text-slate-700">MVP simple: 3 modelos × 2 telas × 3 colores = 18 imágenes ya preparadas. No se genera imagen en vivo.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
