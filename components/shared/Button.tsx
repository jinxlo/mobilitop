import Link from "next/link";
import { cn } from "@/lib/utils";

const styles = {
  primary: "bg-[#1E3A5F] text-white hover:bg-[#162c48]",
  accent: "bg-[#C9A24A] text-[#1F2937] hover:bg-[#b8923f]",
  light: "bg-white text-[#1E3A5F] hover:bg-[#F5EFE6]",
  outline: "border border-[#1E3A5F]/25 text-[#1E3A5F] hover:bg-[#F5EFE6]"
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button"
}: {
  children: React.ReactNode;
  href?: string;
  variant?: keyof typeof styles;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  const classNames = cn("inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition", styles[variant], className);

  if (href) {
    return (
      <Link className={classNames} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classNames} type={type}>
      {children}
    </button>
  );
}
