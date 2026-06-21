import type { FAQ } from "@prisma/client";

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="container-page py-16">
      <h2 className="text-3xl font-black text-[#1E3A5F]">Preguntas frecuentes</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <details className="rounded-3xl bg-white p-6 shadow-sm" key={faq.id}>
            <summary className="cursor-pointer font-black text-[#1E3A5F]">{faq.question}</summary>
            <p className="mt-3 leading-7 text-gray-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
