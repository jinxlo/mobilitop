import { BenefitsSection } from "@/components/public/BenefitsSection";
import { BuyingGuideSection } from "@/components/public/BuyingGuideSection";
import { CategoryGrid } from "@/components/public/CategoryGrid";
import { CustomConfiguratorSection } from "@/components/public/CustomConfiguratorSection";
import { FAQSection } from "@/components/public/FAQSection";
import { FeaturedProducts } from "@/components/public/FeaturedProducts";
import { HeroSlider } from "@/components/public/HeroSlider";
import { PaymentMethodsSection } from "@/components/public/PaymentMethodsSection";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { TrustBadges } from "@/components/public/TrustBadges";
import { VideoShowcaseSection } from "@/components/public/VideoShowcaseSection";
import { WhatsAppCTA } from "@/components/public/WhatsAppCTA";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/tenant-config";
import { whatsappMessages } from "@/lib/whatsapp";

export default async function HomePage() {
  const [settings, slides, categories, featured, promos, faqs] = await Promise.all([
    getSiteSettings(),
    prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" }, take: 8 }),
    prisma.product.findMany({ where: { isActive: true, isFeatured: true }, include: { brand: true, category: true, images: true }, orderBy: { sortOrder: "asc" }, take: 8 }),
    prisma.product.findMany({ where: { isActive: true, isPromotion: true }, include: { brand: true, category: true, images: true }, orderBy: { updatedAt: "desc" }, take: 4 }),
    prisma.fAQ.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } })
  ]);

  return (
    <main>
      <HeroSlider slides={slides} settings={settings} />
      <TrustBadges />
      <CategoryGrid categories={categories} />
      <CustomConfiguratorSection />
      <VideoShowcaseSection />
      <FeaturedProducts products={featured} whatsappNumber={settings.whatsappNumber} />
      <BuyingGuideSection whatsappNumber={settings.whatsappNumber} />
      <BenefitsSection />
      <WhatsAppCTA phone={settings.whatsappNumber} message={whatsappMessages.catalog} title="Encuentra tu colchón ideal sin perder tiempo" />
      <FeaturedProducts products={promos} whatsappNumber={settings.whatsappNumber} title="Promociones activas" />
      <TestimonialsSection />
      <PaymentMethodsSection methods={settings.paymentMethods} />
      <FAQSection faqs={faqs} />
    </main>
  );
}
