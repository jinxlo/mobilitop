import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const generateSlug = slugify;

export async function ensureUniqueSlug(slug: string, exists: (candidate: string) => Promise<boolean>) {
  let candidate = slug;
  let suffix = 2;

  while (await exists(candidate)) {
    candidate = `${slug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

export function formatMoney(value: number | string, currency = "USD") {
  const amount = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(amount);
}

export const formatCurrency = formatMoney;

export function calculateDiscount(price: number, previousPrice?: number | null) {
  if (!previousPrice || previousPrice <= price) return 0;
  return Math.round(((previousPrice - price) / previousPrice) * 100);
}

export function firstImage<T extends { imageUrl: string }>(images: T[] | undefined) {
  return images?.[0]?.imageUrl ?? "/images/product-placeholder.svg";
}
