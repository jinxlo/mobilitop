import { prisma } from "@/lib/db";

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findFirst();

  return (
    settings ?? {
      id: "fallback",
      businessName: "Mobili Top",
      businessDescription: "Catálogo especializado en productos de descanso.",
      logoUrl: null,
      faviconUrl: null,
      primaryColor: "#1E3A5F",
      secondaryColor: "#F5EFE6",
      accentColor: "#C9A24A",
      whatsappNumber: process.env.WHATSAPP_NUMBER ?? "584120000000",
      phoneNumber: "+58 412-0000000",
      email: null,
      instagramUrl: null,
      facebookUrl: null,
      tiktokUrl: null,
      address: "",
      googleMapsUrl: null,
      openingHours: "",
      defaultCurrency: "USD",
      heroTitle: "Encuentra el colchón ideal para tu descanso",
      heroSubtitle: "Asesoría personalizada, variedad de medidas y atención directa por WhatsApp.",
      whatsappDefaultMessage: "Hola, estoy viendo su página web y necesito más información.",
      deliveryInfo: null,
      warrantyInfo: null,
      paymentMethods: ["Pago móvil", "Transferencia"],
      policies: null,
      seoTitle: null,
      seoDescription: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  );
}
