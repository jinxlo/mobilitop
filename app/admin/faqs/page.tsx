import { AdminHeader } from "@/components/admin/AdminHeader";
import { FAQForm } from "@/components/admin/FAQForm";
import { prisma } from "@/lib/db";

export default async function AdminFAQsPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { sortOrder: "asc" } });
  return <div><AdminHeader title="Preguntas frecuentes" /><FAQForm /><div className="mt-6 grid gap-3">{faqs.map((faq) => <div className="rounded-2xl bg-white p-4" key={faq.id}><b>{faq.question}</b><p className="mt-1 text-sm text-gray-600">{faq.answer}</p></div>)}</div></div>;
}
