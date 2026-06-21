import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("rounded-full bg-[#F5EFE6] px-3 py-1 text-xs font-bold text-[#1E3A5F]", className)}>{children}</span>;
}
