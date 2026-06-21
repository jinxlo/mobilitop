import { AdminHeader } from "@/components/admin/AdminHeader";
import { SlideForm } from "@/components/admin/SlideForm";
import { prisma } from "@/lib/db";

export default async function AdminSlidesPage() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" } });
  return <div><AdminHeader title="Slides / Home" /><SlideForm /><div className="mt-6 grid gap-3">{slides.map((slide) => <div className="rounded-2xl bg-white p-4" key={slide.id}><b>{slide.title}</b><span className="ml-3 text-sm text-gray-500">Orden {slide.sortOrder} · {slide.isActive ? "Activo" : "Inactivo"}</span></div>)}</div></div>;
}
