import type { Brand, Category, Product } from "@prisma/client";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";

export function ProductTable({ products }: { products: (Product & { brand: Brand | null; category: Category })[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#F5EFE6] text-[#1E3A5F]"><tr><th className="p-4">Producto</th><th>Categoría</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>
          {products.map((product) => (
            <tr className="border-t" key={product.id}>
              <td className="p-4 font-bold">{product.name}</td>
              <td>{product.category.name}</td>
              <td>{formatMoney(product.price.toString(), product.currency)}</td>
              <td>{product.isActive ? "Activo" : "Inactivo"}</td>
              <td><Link className="font-bold text-[#1E3A5F]" href={`/admin/productos/${product.id}/editar`}>Editar</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
