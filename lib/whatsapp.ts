import type { ConfiguratorInput } from "@/lib/validators/configurator";
import { productNeedLabels } from "@/lib/configurator/options";

export function getWhatsAppUrl(phone: string, message: string) {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export const buildWhatsAppUrl = getWhatsAppUrl;

export function buildProductWhatsAppMessage(productName: string) {
  return `Hola, estoy interesado en el producto: ${productName}. ¿Me podrían dar más información?`;
}

export function buildGeneralWhatsAppMessage() {
  return "Hola, estoy viendo su página web y necesito más información.";
}

export function buildConfiguratorWhatsAppMessage(config: ConfiguratorInput) {
  const extras = config.extras.length ? config.extras.join(", ") : "Sin extras seleccionados";
  const notes = config.notes?.trim();

  return [
    "Hola, diseñé una cotización personalizada en la web de Mobili Top.",
    "",
    `Producto: ${productNeedLabels[config.productNeed]}`,
    `Modelo: ${config.model}`,
    `Medida: ${config.size}`,
    `Tela/material: ${config.fabric}`,
    `Color: ${config.color}`,
    `Patas/base: ${config.legs}`,
    `Extras: ${extras}`,
    `Entrega: ${config.delivery}`,
    `Presupuesto aproximado: ${config.budget}`,
    notes ? `Notas: ${notes}` : null,
    "",
    "¿Me pueden confirmar precio final, tiempo de fabricación y disponibilidad?"
  ].filter(Boolean).join("\n");
}

export const whatsappMessages = {
  catalog: "Hola, estoy viendo su catálogo y necesito ayuda para elegir un colchón.",
  promotion: "Hola, quiero consultar por las promociones disponibles.",
  product: buildProductWhatsAppMessage
};
