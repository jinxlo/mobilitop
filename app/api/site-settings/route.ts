import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/tenant-config";
import { settingsSchema } from "@/lib/validators/settings";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ success: true, data: settings });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const settings = await getSiteSettings();
  const parsed = settingsSchema.parse({
    ...raw,
    businessDescription: raw.businessDescription || null,
    logoUrl: raw.logoUrl || null,
    faviconUrl: raw.faviconUrl || null,
    phoneNumber: raw.phoneNumber || null,
    email: raw.email || null,
    instagramUrl: raw.instagramUrl || null,
    facebookUrl: raw.facebookUrl || null,
    tiktokUrl: raw.tiktokUrl || null,
    address: raw.address || null,
    googleMapsUrl: raw.googleMapsUrl || null,
    openingHours: raw.openingHours || null,
    heroSubtitle: raw.heroSubtitle || "",
    deliveryInfo: raw.deliveryInfo || null,
    warrantyInfo: raw.warrantyInfo || null,
    policies: raw.policies || null,
    seoTitle: raw.seoTitle || null,
    seoDescription: raw.seoDescription || null,
    paymentMethods: String(raw.paymentMethods ?? "").split("\n").map((item) => item.trim()).filter(Boolean)
  });
  await prisma.siteSettings.update({
    where: { id: settings.id },
    data: parsed
  });
  return NextResponse.redirect(new URL("/admin/configuracion", request.url));
}
