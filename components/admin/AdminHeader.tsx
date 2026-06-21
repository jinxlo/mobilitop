import Link from "next/link";

export function AdminHeader({ title }: { title: string }) {
  return (
    <div className="mb-8 flex items-center justify-between border-b pb-5">
      <h1 className="text-3xl font-black text-[#1E3A5F]">{title}</h1>
      <Link className="rounded-full bg-[#1E3A5F] px-4 py-2 text-sm font-bold text-white" href="/">Ver sitio</Link>
    </div>
  );
}
