export function PaymentMethodsSection({ methods }: { methods: string[] }) {
  return (
    <section className="bg-[#F5EFE6] py-16">
      <div className="container-page">
        <h2 className="text-3xl font-black text-[#1E3A5F]">Métodos de pago</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {methods.map((method) => <span className="rounded-full bg-white px-5 py-3 font-bold text-[#1E3A5F]" key={method}>{method}</span>)}
        </div>
      </div>
    </section>
  );
}
