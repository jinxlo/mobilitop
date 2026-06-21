export default function AboutPage() {
  return (
    <main className="container-page py-16">
      <div className="max-w-4xl">
        <p className="font-bold uppercase tracking-[0.2em] text-[#C9A24A]">Nosotros</p>
        <h1 className="mt-3 text-5xl font-black leading-tight text-[#1E3A5F]">Una experiencia de compra pensada para elegir mejor tu descanso</h1>
        <p className="mt-6 text-lg leading-8 text-gray-700">Esta base permite adaptar el contenido para fabricante o tienda revendedora: historia, materiales, fabricación, venta directa, variedad de marcas, asesoría y cercanía con el cliente.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <section className="rounded-3xl bg-white p-8"><h2 className="text-2xl font-black text-[#1E3A5F]">Fabricante</h2><p className="mt-3 leading-7 text-gray-700">Directo de fábrica, materiales seleccionados, calidad fabricada para tu descanso y capacidad de producción.</p></section>
        <section className="rounded-3xl bg-white p-8"><h2 className="text-2xl font-black text-[#1E3A5F]">Tienda o revendedor</h2><p className="mt-3 leading-7 text-gray-700">Variedad de modelos, asesoría por presupuesto, atención rápida y disponibilidad actualizada.</p></section>
      </div>
    </main>
  );
}
