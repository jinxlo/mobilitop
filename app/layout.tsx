import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/public/Footer";
import { Header } from "@/components/public/Header";
import { WhatsAppFloatingButton } from "@/components/public/WhatsAppFloatingButton";
import { getSiteSettings } from "@/lib/tenant-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobilitop.com"),
  title: {
    default: "Mobili Top | Colchones, bases y descanso",
    template: "%s | Mobili Top"
  },
  description: "Catálogo moderno de colchones, bases, almohadas y productos de descanso con asesoría directa por WhatsApp.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/app-icon.svg",
    apple: "/icons/app-icon.svg"
  },
  openGraph: {
    title: "Mobili Top | Colchones, bases y descanso",
    description: "Encuentra el colchón ideal con asesoría personalizada, promociones y atención por WhatsApp.",
    type: "website",
    locale: "es_VE"
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mobili Top"
  },
  formatDetection: {
    telephone: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E3A5F"
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <html lang="es">
      <body>
        <Header settings={settings} />
        {children}
        <Footer settings={settings} />
        <WhatsAppFloatingButton phone={settings.whatsappNumber} />
      </body>
    </html>
  );
}
