import type { HeroSlide } from "@prisma/client";

export function SlideForm({ slide }: { slide?: HeroSlide }) {
  return (
    <form className="grid gap-4 rounded-3xl bg-white p-6" method="post" action={slide ? `/api/slides/${slide.id}` : "/api/slides"}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">Título<input className="rounded-2xl border px-4 py-3 font-normal" name="title" defaultValue={slide?.title} required /></label>
        <label className="grid gap-2 font-bold">Imagen<input className="rounded-2xl border px-4 py-3 font-normal" name="imageUrl" defaultValue={slide?.imageUrl ?? "/images/hero-1.png"} required /></label>
        <label className="grid gap-2 font-bold">Botón principal<input className="rounded-2xl border px-4 py-3 font-normal" name="buttonLabel" defaultValue={slide?.buttonLabel ?? ""} /></label>
        <label className="grid gap-2 font-bold">URL principal<input className="rounded-2xl border px-4 py-3 font-normal" name="buttonUrl" defaultValue={slide?.buttonUrl ?? ""} /></label>
        <label className="grid gap-2 font-bold">Botón secundario<input className="rounded-2xl border px-4 py-3 font-normal" name="secondaryButtonLabel" defaultValue={slide?.secondaryButtonLabel ?? ""} /></label>
        <label className="grid gap-2 font-bold">URL secundaria<input className="rounded-2xl border px-4 py-3 font-normal" name="secondaryButtonUrl" defaultValue={slide?.secondaryButtonUrl ?? ""} /></label>
        <label className="grid gap-2 font-bold">Orden<input className="rounded-2xl border px-4 py-3 font-normal" name="sortOrder" type="number" defaultValue={slide?.sortOrder ?? 0} /></label>
      </div>
      <label className="grid gap-2 font-bold">Subtítulo<textarea className="rounded-2xl border px-4 py-3 font-normal" name="subtitle" defaultValue={slide?.subtitle ?? ""} /></label>
      <label><input name="isActive" type="checkbox" defaultChecked={slide?.isActive ?? true} /> Activo</label>
      <button className="rounded-full bg-[#1E3A5F] px-6 py-3 font-bold text-white" type="submit">Guardar slide</button>
    </form>
  );
}
