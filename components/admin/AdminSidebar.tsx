import Link from "next/link";

const links = [
  ["Dashboard", "/admin/dashboard"],
  ["Productos", "/admin/productos"],
  ["Categorías", "/admin/categorias"],
  ["Marcas", "/admin/marcas"],
  ["Promociones", "/admin/promociones"],
  ["Slides / Home", "/admin/slides"],
  ["Solicitudes", "/admin/solicitudes"],
  ["Preguntas frecuentes", "/admin/faqs"],
  ["Configuración", "/admin/configuracion"],
  ["Usuarios", "/admin/usuarios"],
  ["Ver sitio", "/"]
];

export function AdminSidebar() {
  return (
    <aside className="min-h-screen bg-[#0F172A] p-5 text-white">
      <h2 className="text-xl font-black">Admin</h2>
      <nav className="mt-8 grid gap-2">
        {links.map(([label, href]) => <Link className="rounded-2xl px-4 py-3 font-bold hover:bg-white/10" href={href} key={href}>{label}</Link>)}
      </nav>
    </aside>
  );
}
