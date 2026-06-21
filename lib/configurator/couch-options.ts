import type { ConfiguratorInput } from "@/lib/validators/configurator";

export type CouchConfiguratorInput = {
  productNeed: "couch";
  model: "loveseat" | "three-seat" | "sectional";
  fabric: "chenille" | "linen";
  color: "beige" | "gray" | "navy";
  delivery: string;
  budget: string;
  notes: string;
};

export const couchModels = [
  { id: "loveseat", label: "Sofá 2 puestos", copy: "Compacto para apartamentos, estudios o habitaciones." },
  { id: "three-seat", label: "Sofá 3 puestos", copy: "La opción más versátil para sala principal." },
  { id: "sectional", label: "Seccional en L", copy: "Más espacio para familias y salas amplias." }
] as const;

export const couchFabrics = [
  { id: "chenille", label: "Chenille", copy: "Textura suave, elegante y cómoda." },
  { id: "linen", label: "Lino", copy: "Look fresco, moderno y natural." }
] as const;

export const couchColors = [
  { id: "beige", label: "Beige", value: "#D8C5A5" },
  { id: "gray", label: "Gris", value: "#8D9299" },
  { id: "navy", label: "Azul marino", value: "#1E3A5F" }
] as const;

export const couchDeliveryOptions = ["Retiro", "Delivery", "Delivery + instalación", "Consultar según zona"];
export const couchBudgetOptions = ["Hasta $400", "$400 - $700", "$700 - $1.000", "Más de $1.000", "Necesito asesoría"];

export function getDefaultCouchConfig(): CouchConfiguratorInput {
  return {
    productNeed: "couch",
    model: "three-seat",
    fabric: "chenille",
    color: "beige",
    delivery: "Consultar según zona",
    budget: "$400 - $700",
    notes: ""
  };
}

export function couchImagePath(config: Pick<CouchConfiguratorInput, "model" | "fabric" | "color">) {
  return `/images/configurator/couches/${config.model}-${config.fabric}-${config.color}.png`;
}

export function couchToConfiguratorInput(config: CouchConfiguratorInput): ConfiguratorInput {
  const model = couchModels.find((item) => item.id === config.model)?.label ?? config.model;
  const fabric = couchFabrics.find((item) => item.id === config.fabric)?.label ?? config.fabric;
  const color = couchColors.find((item) => item.id === config.color)?.label ?? config.color;

  return {
    productNeed: "sofa",
    model,
    size: model,
    fabric,
    color,
    legs: "Madera natural",
    extras: [],
    delivery: config.delivery,
    budget: config.budget,
    notes: config.notes
  };
}
