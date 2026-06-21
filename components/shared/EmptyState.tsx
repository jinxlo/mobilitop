export function EmptyState({ title, text, description, icon }: { title: string; text?: string; description?: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#1E3A5F]/25 bg-white p-10 text-center">
      {icon ? <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#F5EFE6] text-[#1E3A5F]">{icon}</div> : null}
      <h3 className="text-xl font-bold text-[#1E3A5F]">{title}</h3>
      {description || text ? <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">{description ?? text}</p> : null}
    </div>
  );
}
