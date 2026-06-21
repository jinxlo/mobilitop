import type { Brand } from "@prisma/client";

export function BrandForm({ brand }: { brand?: Brand }) {
  return (
    <form className="grid gap-4 rounded-3xl bg-white p-6" method="post" action={brand ? `/api/brands/${brand.id}` : "/api/brands"}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">Nombre<input className="rounded-2xl border px-4 py-3 font-normal" name="name" defaultValue={brand?.name} required /></label>
        <label className="grid gap-2 font-bold">Slug<input className="rounded-2xl border px-4 py-3 font-normal" name="slug" defaultValue={brand?.slug} /></label>
        <label className="grid gap-2 font-bold">Logo<input className="rounded-2xl border px-4 py-3 font-normal" name="logoUrl" defaultValue={brand?.logoUrl ?? ""} /></label>
        <label className="grid gap-2 font-bold">Orden<input className="rounded-2xl border px-4 py-3 font-normal" name="sortOrder" type="number" defaultValue={brand?.sortOrder ?? 0} /></label>
      </div>
      <label className="grid gap-2 font-bold">Descripción<textarea className="rounded-2xl border px-4 py-3 font-normal" name="description" defaultValue={brand?.description ?? ""} /></label>
      <label><input name="isActive" type="checkbox" defaultChecked={brand?.isActive ?? true} /> Activa</label>
      <button className="rounded-full bg-[#1E3A5F] px-6 py-3 font-bold text-white" type="submit">Guardar marca</button>
    </form>
  );
}
