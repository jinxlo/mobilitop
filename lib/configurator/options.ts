import type { ConfiguratorInput } from "@/lib/validators/configurator";

export const productNeedLabels: Record<ConfiguratorInput["productNeed"], string> = {
  sofa: "Sofá personalizado",
  bed_base: "Base cama a medida",
  headboard: "Cabecero / respaldo",
  mattress: "Colchón",
  ottoman: "Puff / otomana",
  unsure: "Necesito asesoría"
};

export const productNeedCopy: Record<ConfiguratorInput["productNeed"], string> = {
  sofa: "Diseña un sofá para sala, oficina o habitación con color, tela y módulos a tu gusto.",
  bed_base: "Configura una base tapizada o funcional según tu cama y espacio.",
  headboard: "Elige estilo, color y tamaño para un cabecero fabricado a medida.",
  mattress: "Define medida y firmeza para que ventas te recomiende el descanso ideal.",
  ottoman: "Crea un puff u otomana de apoyo con tela y color personalizados.",
  unsure: "Cuéntanos qué espacio quieres resolver y te orientamos por WhatsApp."
};

export const modelOptions: Record<ConfiguratorInput["productNeed"], string[]> = {
  sofa: ["2 puestos", "3 puestos", "Seccional en L", "Modular", "Sofá cama"],
  bed_base: ["Base simple", "Base tapizada", "Base con gavetas", "Base flotante", "Base premium"],
  headboard: ["Liso moderno", "Capitoné", "Paneles verticales", "Con mesas laterales", "A medida"],
  mattress: ["Ortopédico", "Pillow top", "Semi-firme", "Premium", "A medida"],
  ottoman: ["Puff redondo", "Otomana rectangular", "Baúl tapizado", "Banco pie de cama", "A medida"],
  unsure: ["Quiero asesoría", "Mueble para sala", "Mueble para habitación", "Proyecto comercial", "Otro"]
};

export const sizeOptions = ["Compacto", "Individual", "Matrimonial", "Queen", "King", "A medida"];
export const fabricOptions = ["Chenille", "Lino", "Terciopelo", "Microfibra", "Cuero sintético", "Tela antimanchas"];
export const colorOptions = [
  { name: "Beige", value: "#D8C5A5" },
  { name: "Gris claro", value: "#B8BDC4" },
  { name: "Gris oscuro", value: "#4B5563" },
  { name: "Azul marino", value: "#1E3A5F" },
  { name: "Marrón", value: "#7A5134" },
  { name: "Verde oliva", value: "#61735A" },
  { name: "Negro", value: "#111827" }
];
export const legOptions = ["Madera natural", "Madera oscura", "Metal negro", "Dorado", "Sin patas visibles"];
export const extraOptions = ["Cojines decorativos", "Almacenamiento", "Brazos anchos", "Costura premium", "Tela impermeable", "Entrega e instalación"];
export const deliveryOptions = ["Retiro", "Delivery", "Delivery + instalación", "Consultar según zona"];
export const budgetOptions = ["Hasta $200", "$200 - $400", "$400 - $700", "Más de $700", "Necesito asesoría"];

export function getDefaultConfiguratorInput(): ConfiguratorInput {
  return {
    productNeed: "sofa",
    model: "3 puestos",
    size: "A medida",
    fabric: "Chenille",
    color: "Beige",
    legs: "Madera natural",
    extras: ["Cojines decorativos"],
    delivery: "Consultar según zona",
    budget: "$400 - $700",
    notes: ""
  };
}
