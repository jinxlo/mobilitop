import type { FAQ } from "@prisma/client";

export function FAQForm({ faq }: { faq?: FAQ }) {
  return (
    <form className="grid gap-4 rounded-3xl bg-white p-6" method="post" action={faq ? `/api/faqs/${faq.id}` : "/api/faqs"}>
      <label className="grid gap-2 font-bold">Pregunta<input className="rounded-2xl border px-4 py-3 font-normal" name="question" defaultValue={faq?.question} required /></label>
      <label className="grid gap-2 font-bold">Respuesta<textarea className="rounded-2xl border px-4 py-3 font-normal" name="answer" defaultValue={faq?.answer} required /></label>
      <label className="grid gap-2 font-bold">Orden<input className="rounded-2xl border px-4 py-3 font-normal" name="sortOrder" type="number" defaultValue={faq?.sortOrder ?? 0} /></label>
      <label><input name="isActive" type="checkbox" defaultChecked={faq?.isActive ?? true} /> Activa</label>
      <button className="rounded-full bg-[#1E3A5F] px-6 py-3 font-bold text-white" type="submit">Guardar FAQ</button>
    </form>
  );
}
