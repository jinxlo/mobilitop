import { getWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export function WhatsAppFloatingButton({ phone }: { phone: string }) {
  return (
    <a className="fixed bottom-5 right-5 z-50 hidden rounded-full bg-[#2F7D5C] px-5 py-4 text-sm font-black text-white shadow-2xl lg:block" href={getWhatsAppUrl(phone, whatsappMessages.catalog)} target="_blank">
      WhatsApp
    </a>
  );
}
