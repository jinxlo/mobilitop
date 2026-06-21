import type { Brand, Category, Product } from "@prisma/client";

export function ProductForm({ product, categories, brands }: { product?: Product | null; categories: Category[]; brands: Brand[] }) {
  return (
    <form className="grid gap-5 rounded-3xl bg-white p-6" method="post" action={product ? `/api/products/${product.id}` : "/api/products"}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">Nombre<input className="rounded-2xl border px-4 py-3 font-normal" name="name" defaultValue={product?.name} required /></label>
        <label className="grid gap-2 font-bold">SKU<input className="rounded-2xl border px-4 py-3 font-normal" name="sku" defaultValue={product?.sku ?? ""} /></label>
        <label className="grid gap-2 font-bold">Slug<input className="rounded-2xl border px-4 py-3 font-normal" name="slug" defaultValue={product?.slug ?? ""} /></label>
        <label className="grid gap-2 font-bold">Precio<input className="rounded-2xl border px-4 py-3 font-normal" name="price" type="number" step="0.01" defaultValue={product?.price.toString()} required /></label>
        <label className="grid gap-2 font-bold">Precio anterior<input className="rounded-2xl border px-4 py-3 font-normal" name="previousPrice" type="number" step="0.01" defaultValue={product?.previousPrice?.toString() ?? ""} /></label>
        <label className="grid gap-2 font-bold">Moneda<input className="rounded-2xl border px-4 py-3 font-normal" name="currency" defaultValue={product?.currency ?? "USD"} /></label>
        <label className="grid gap-2 font-bold">Stock<input className="rounded-2xl border px-4 py-3 font-normal" name="stockQuantity" type="number" defaultValue={product?.stockQuantity ?? 0} /></label>
        <label className="grid gap-2 font-bold">Disponibilidad<select className="rounded-2xl border px-4 py-3 font-normal" name="availabilityStatus" defaultValue={product?.availabilityStatus ?? "IN_STOCK"}><option value="IN_STOCK">Disponible</option><option value="LOW_STOCK">Pocas unidades</option><option value="ON_REQUEST">Bajo pedido</option><option value="OUT_OF_STOCK">Agotado</option></select></label>
        <label className="grid gap-2 font-bold">Categoría<select className="rounded-2xl border px-4 py-3 font-normal" name="categoryId" defaultValue={product?.categoryId}>{categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select></label>
        <label className="grid gap-2 font-bold">Marca<select className="rounded-2xl border px-4 py-3 font-normal" name="brandId" defaultValue={product?.brandId ?? ""}><option value="">Sin marca</option>{brands.map((brand) => <option value={brand.id} key={brand.id}>{brand.name}</option>)}</select></label>
        <label className="grid gap-2 font-bold">Subcategoría<input className="rounded-2xl border px-4 py-3 font-normal" name="subcategory" defaultValue={product?.subcategory ?? ""} /></label>
        <label className="grid gap-2 font-bold">Medida<input className="rounded-2xl border px-4 py-3 font-normal" name="mattressSize" defaultValue={product?.mattressSize ?? ""} /></label>
        <label className="grid gap-2 font-bold">Tipo<input className="rounded-2xl border px-4 py-3 font-normal" name="mattressType" defaultValue={product?.mattressType ?? ""} /></label>
        <label className="grid gap-2 font-bold">Firmeza<input className="rounded-2xl border px-4 py-3 font-normal" name="firmness" defaultValue={product?.firmness ?? ""} /></label>
        <label className="grid gap-2 font-bold">Orden<input className="rounded-2xl border px-4 py-3 font-normal" name="sortOrder" type="number" defaultValue={product?.sortOrder ?? 0} /></label>
      </div>
      <label className="grid gap-2 font-bold">Descripción corta<textarea className="rounded-2xl border px-4 py-3 font-normal" name="shortDescription" defaultValue={product?.shortDescription ?? ""} /></label>
      <label className="grid gap-2 font-bold">Descripción larga<textarea className="min-h-32 rounded-2xl border px-4 py-3 font-normal" name="longDescription" defaultValue={product?.longDescription ?? ""} /></label>
      <label className="grid gap-2 font-bold">Características (una por línea)<textarea className="rounded-2xl border px-4 py-3 font-normal" name="features" defaultValue={product?.features.join("\n") ?? ""} /></label>
      <label className="grid gap-2 font-bold">Materiales (uno por línea)<textarea className="rounded-2xl border px-4 py-3 font-normal" name="materials" defaultValue={product?.materials.join("\n") ?? ""} /></label>
      <label className="grid gap-2 font-bold">Garantía<textarea className="rounded-2xl border px-4 py-3 font-normal" name="warranty" defaultValue={product?.warranty ?? ""} /></label>
      <label className="grid gap-2 font-bold">Cuidados<textarea className="rounded-2xl border px-4 py-3 font-normal" name="careInstructions" defaultValue={product?.careInstructions ?? ""} /></label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">SEO title<input className="rounded-2xl border px-4 py-3 font-normal" name="seoTitle" defaultValue={product?.seoTitle ?? ""} /></label>
        <label className="grid gap-2 font-bold">SEO description<input className="rounded-2xl border px-4 py-3 font-normal" name="seoDescription" defaultValue={product?.seoDescription ?? ""} /></label>
      </div>
      <div className="flex flex-wrap gap-5">
        <label><input name="isActive" type="checkbox" defaultChecked={product?.isActive ?? true} /> Activo</label>
        <label><input name="isFeatured" type="checkbox" defaultChecked={product?.isFeatured ?? false} /> Destacado</label>
        <label><input name="isPromotion" type="checkbox" defaultChecked={product?.isPromotion ?? false} /> Promoción</label>
      </div>
      <button className="rounded-full bg-[#1E3A5F] px-6 py-3 font-bold text-white" type="submit">Guardar producto</button>
    </form>
  );
}
