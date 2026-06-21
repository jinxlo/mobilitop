import type { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, GridFour } from "@phosphor-icons/react/dist/ssr";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#C9A24A] shadow-sm">
            <GridFour size={15} weight="fill" />
            Categorías
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#1E3A5F] md:text-5xl">Compra por tipo de descanso</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">Explora productos por necesidad: colchones, bases, almohadas, protectores y promociones activas.</p>
        </div>
        <Link className="inline-flex items-center gap-2 font-black text-[#1E3A5F]" href="/productos">Ver catálogo <ArrowRight size={18} weight="bold" /></Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link className="soft-card group relative overflow-hidden rounded-[2rem] transition duration-200 hover:-translate-y-1 hover:shadow-2xl" href={`/categorias/${category.slug}`} key={category.id}>
            <div className="relative h-44 overflow-hidden bg-[#F5EFE6]">
              <Image src={category.imageUrl ?? "/images/category-colchones.png"} alt={category.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" />
              {category.slug === "promociones" ? <div className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#C9A24A] text-[#1E3A5F]"><Gift size={24} weight="fill" /></div> : null}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-black text-[#1E3A5F]">{category.name}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{category.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#2F7D5C]">
                Explorar <ArrowRight size={16} weight="bold" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
