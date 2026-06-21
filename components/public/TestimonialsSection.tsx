export function TestimonialsSection() {
  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <h2 className="text-3xl font-black text-[#1E3A5F]">Atención directa y cercana</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["Me ayudaron a elegir la medida correcta.", "Respondieron rápido por WhatsApp.", "Buena variedad para comparar precios."].map((text) => <blockquote className="rounded-3xl bg-[#F5EFE6] p-6 text-gray-700" key={text}>“{text}”</blockquote>)}
        </div>
      </div>
    </section>
  );
}
