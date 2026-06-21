import Link from "next/link";

export function MobileMenu({ links }: { links: string[][] }) {
  return (
    <details className="lg:hidden">
      <summary className="cursor-pointer rounded-full border border-[#1E3A5F]/20 px-4 py-2 text-sm font-bold text-[#1E3A5F]">Menú</summary>
      <div className="absolute left-4 right-4 top-28 rounded-3xl border bg-white p-4 shadow-2xl">
        {links.map(([label, href]) => (
          <Link className="block rounded-2xl px-4 py-3 font-semibold text-gray-700 hover:bg-[#F5EFE6]" href={href} key={href}>
            {label}
          </Link>
        ))}
      </div>
    </details>
  );
}
