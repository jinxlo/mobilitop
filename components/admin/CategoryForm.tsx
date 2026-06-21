import type { Category } from "@prisma/client";

export function CategoryForm({ category }: { category?: Category }) {
  return (
    <form className="grid gap-4 rounded-3xl bg-white p-6" method="post" action={category ? `/api/categories/${category.id}` : "/api/categories"}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">Nombre<input className="rounded-2xl border px-4 py-3 font-normal" name="name" defaultValue={category?.name} required /></label>
        <label className="grid gap-2 font-bold">Slug<input className="rounded-2xl border px-4 py-3 font-normal" name="slug" defaultValue={category?.slug} /></label>
        <label className="grid gap-2 font-bold">Imagen<input className="rounded-2xl border px-4 py-3 font-normal" name="imageUrl" defaultValue={category?.imageUrl ?? ""} /></label>
        <label className="grid gap-2 font-bold">Orden<input className="rounded-2xl border px-4 py-3 font-normal" name="sortOrder" type="number" defaultValue={category?.sortOrder ?? 0} /></label>
      </div>
      <label className="grid gap-2 font-bold">Descripción<textarea className="rounded-2xl border px-4 py-3 font-normal" name="description" defaultValue={category?.description ?? ""} /></label>
      <label><input name="isActive" type="checkbox" defaultChecked={category?.isActive ?? true} /> Activa</label>
      <button className="rounded-full bg-[#1E3A5F] px-6 py-3 font-bold text-white" type="submit">Guardar categoría</button>
    </form>
  );
}
