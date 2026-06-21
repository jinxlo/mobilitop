import type { Brand, Category } from "@prisma/client";
import Link from "next/link";

export function ProductFilters({ categories, brands, params = {} }: { categories: Category[]; brands: Brand[]; params?: Record<string, string | undefined> }) {
  return (
    <form className="soft-card mb-8 grid gap-3 rounded-3xl p-4 md:grid-cols-5" action="/productos">
      <input className="rounded-2xl border px-4 py-3 md:col-span-2" name="search" placeholder="Buscar producto" defaultValue={params.search ?? params.q} />
      <select className="rounded-2xl border px-4 py-3" name="category">
        <option value="">Categoría</option>
        {categories.map((category) => <option value={category.slug} key={category.id} selected={params.category === category.slug}>{category.name}</option>)}
      </select>
      <select className="rounded-2xl border px-4 py-3" name="brand">
        <option value="">Marca</option>
        {brands.map((brand) => <option value={brand.slug} key={brand.id} selected={params.brand === brand.slug}>{brand.name}</option>)}
      </select>
      <select className="rounded-2xl border px-4 py-3" name="sort">
        <option value="recent">Más recientes</option>
        <option value="price_asc">Menor precio</option>
        <option value="price_desc">Mayor precio</option>
        <option value="featured">Destacados</option>
      </select>
      <input className="rounded-2xl border px-4 py-3" name="mattressSize" placeholder="Medida" defaultValue={params.mattressSize} />
      <input className="rounded-2xl border px-4 py-3" name="firmness" placeholder="Firmeza" defaultValue={params.firmness} />
      <input className="rounded-2xl border px-4 py-3" name="mattressType" placeholder="Tipo" defaultValue={params.mattressType} />
      <input className="rounded-2xl border px-4 py-3" name="minPrice" type="number" placeholder="Precio mín." defaultValue={params.minPrice} />
      <input className="rounded-2xl border px-4 py-3" name="maxPrice" type="number" placeholder="Precio máx." defaultValue={params.maxPrice} />
      <select className="rounded-2xl border px-4 py-3" name="availability">
        <option value="">Disponibilidad</option>
        <option value="IN_STOCK">Disponible</option>
        <option value="ON_REQUEST">Bajo pedido</option>
        <option value="OUT_OF_STOCK">Agotado</option>
      </select>
      <label className="flex items-center gap-2 rounded-2xl border px-4 py-3 font-bold"><input name="promotion" type="checkbox" value="true" defaultChecked={params.promotion === "true"} /> Solo ofertas</label>
      <div className="flex gap-3 md:col-span-5">
        <button className="rounded-2xl bg-[#1E3A5F] px-4 py-3 font-bold text-white" type="submit">Filtrar productos</button>
        <Link className="rounded-2xl border px-4 py-3 font-bold text-[#1E3A5F]" href="/productos">Limpiar filtros</Link>
      </div>
    </form>
  );
}
