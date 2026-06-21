import type { SiteSettings } from "@prisma/client";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  return (
    <form className="grid gap-4 rounded-3xl bg-white p-6" method="post" action="/api/site-settings">
      <section className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">Nombre del negocio<input className="rounded-2xl border px-4 py-3 font-normal" name="businessName" defaultValue={settings.businessName} /></label>
        <label className="grid gap-2 font-bold">Moneda<input className="rounded-2xl border px-4 py-3 font-normal" name="defaultCurrency" defaultValue={settings.defaultCurrency} /></label>
        <label className="grid gap-2 font-bold">Logo URL<input className="rounded-2xl border px-4 py-3 font-normal" name="logoUrl" defaultValue={settings.logoUrl ?? ""} /></label>
        <label className="grid gap-2 font-bold">Favicon URL<input className="rounded-2xl border px-4 py-3 font-normal" name="faviconUrl" defaultValue={settings.faviconUrl ?? ""} /></label>
        <label className="grid gap-2 font-bold">Color principal<input className="h-12 rounded-2xl border px-4 py-2 font-normal" name="primaryColor" type="color" defaultValue={settings.primaryColor} /></label>
        <label className="grid gap-2 font-bold">Color secundario<input className="h-12 rounded-2xl border px-4 py-2 font-normal" name="secondaryColor" type="color" defaultValue={settings.secondaryColor} /></label>
        <label className="grid gap-2 font-bold">Color acento<input className="h-12 rounded-2xl border px-4 py-2 font-normal" name="accentColor" type="color" defaultValue={settings.accentColor} /></label>
        <label className="grid gap-2 font-bold">WhatsApp<input className="rounded-2xl border px-4 py-3 font-normal" name="whatsappNumber" defaultValue={settings.whatsappNumber} /></label>
        <label className="grid gap-2 font-bold">Teléfono<input className="rounded-2xl border px-4 py-3 font-normal" name="phoneNumber" defaultValue={settings.phoneNumber ?? ""} /></label>
        <label className="grid gap-2 font-bold">Email<input className="rounded-2xl border px-4 py-3 font-normal" name="email" defaultValue={settings.email ?? ""} /></label>
        <label className="grid gap-2 font-bold">Instagram<input className="rounded-2xl border px-4 py-3 font-normal" name="instagramUrl" defaultValue={settings.instagramUrl ?? ""} /></label>
        <label className="grid gap-2 font-bold">Facebook<input className="rounded-2xl border px-4 py-3 font-normal" name="facebookUrl" defaultValue={settings.facebookUrl ?? ""} /></label>
        <label className="grid gap-2 font-bold">TikTok<input className="rounded-2xl border px-4 py-3 font-normal" name="tiktokUrl" defaultValue={settings.tiktokUrl ?? ""} /></label>
        <label className="grid gap-2 font-bold">Dirección<input className="rounded-2xl border px-4 py-3 font-normal" name="address" defaultValue={settings.address ?? ""} /></label>
        <label className="grid gap-2 font-bold">Google Maps<input className="rounded-2xl border px-4 py-3 font-normal" name="googleMapsUrl" defaultValue={settings.googleMapsUrl ?? ""} /></label>
        <label className="grid gap-2 font-bold">Horario<input className="rounded-2xl border px-4 py-3 font-normal" name="openingHours" defaultValue={settings.openingHours ?? ""} /></label>
      </section>
      <label className="grid gap-2 font-bold">Descripción del negocio<textarea className="rounded-2xl border px-4 py-3 font-normal" name="businessDescription" defaultValue={settings.businessDescription ?? ""} /></label>
      <label className="grid gap-2 font-bold">Texto hero<input className="rounded-2xl border px-4 py-3 font-normal" name="heroTitle" defaultValue={settings.heroTitle} /></label>
      <label className="grid gap-2 font-bold">Subtítulo hero<textarea className="rounded-2xl border px-4 py-3 font-normal" name="heroSubtitle" defaultValue={settings.heroSubtitle} /></label>
      <label className="grid gap-2 font-bold">Mensaje WhatsApp general<textarea className="rounded-2xl border px-4 py-3 font-normal" name="whatsappDefaultMessage" defaultValue={settings.whatsappDefaultMessage} /></label>
      <label className="grid gap-2 font-bold">Métodos de pago (uno por línea)<textarea className="rounded-2xl border px-4 py-3 font-normal" name="paymentMethods" defaultValue={settings.paymentMethods.join("\n")} /></label>
      <label className="grid gap-2 font-bold">Delivery<textarea className="rounded-2xl border px-4 py-3 font-normal" name="deliveryInfo" defaultValue={settings.deliveryInfo ?? ""} /></label>
      <label className="grid gap-2 font-bold">Garantía<textarea className="rounded-2xl border px-4 py-3 font-normal" name="warrantyInfo" defaultValue={settings.warrantyInfo ?? ""} /></label>
      <label className="grid gap-2 font-bold">Políticas<textarea className="rounded-2xl border px-4 py-3 font-normal" name="policies" defaultValue={settings.policies ?? ""} /></label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">SEO title<input className="rounded-2xl border px-4 py-3 font-normal" name="seoTitle" defaultValue={settings.seoTitle ?? ""} /></label>
        <label className="grid gap-2 font-bold">SEO description<input className="rounded-2xl border px-4 py-3 font-normal" name="seoDescription" defaultValue={settings.seoDescription ?? ""} /></label>
      </div>
      <button className="rounded-full bg-[#1E3A5F] px-6 py-3 font-bold text-white" type="submit">Guardar configuración</button>
    </form>
  );
}
