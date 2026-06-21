import Link from "next/link";

export function Pagination({ page, totalPages, basePath }: { page: number; totalPages: number; basePath: string }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      {page > 1 ? <Link className="rounded-full border px-4 py-2" href={`${basePath}?page=${page - 1}`}>Anterior</Link> : null}
      <span className="text-sm text-gray-600">Página {page} de {totalPages}</span>
      {page < totalPages ? <Link className="rounded-full border px-4 py-2" href={`${basePath}?page=${page + 1}`}>Siguiente</Link> : null}
    </div>
  );
}
