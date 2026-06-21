import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@mobilitop.test";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Administrador",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: "ADMIN"
    }
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      businessName: "Mobili Top",
      businessDescription: "Catálogo especializado en colchones, bases, almohadas y productos de descanso.",
      whatsappNumber: process.env.WHATSAPP_NUMBER ?? "584120000000",
      phoneNumber: "+58 412-0000000",
      email: "ventas@mobilitop.test",
      address: "Caracas, Venezuela",
      openingHours: "Lunes a sábado, 9:00 AM - 6:00 PM",
      instagramUrl: "https://instagram.com/mobilitop",
      defaultCurrency: "USD",
      deliveryInfo: "Delivery o retiro según disponibilidad y zona.",
      warrantyInfo: "Garantía según producto y condiciones del fabricante.",
      paymentMethods: ["Pago móvil", "Transferencia", "Zelle", "Efectivo"],
      seoTitle: "Mobili Top | Colchones y descanso",
      seoDescription: "Catálogo de colchones, bases, almohadas y productos de descanso con asesoría por WhatsApp."
    }
  });

  const categories = ["Colchones", "Bases", "Almohadas", "Protectores", "Muebles", "Promociones"];
  for (const [index, name] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: {
        name,
        slug: slugify(name),
        description: `Productos de ${name.toLowerCase()} para mejorar tu descanso.`,
        imageUrl: `/images/category-${slugify(name)}.png`,
        sortOrder: index
      }
    });
  }

  const brand = await prisma.brand.upsert({
    where: { slug: "mobilitop" },
    update: {},
    create: {
      name: "Mobili Top",
      slug: "mobilitop",
      description: "Selección de productos de descanso con atención directa."
    }
  });

  const colchones = await prisma.category.findUniqueOrThrow({ where: { slug: "colchones" } });
  const bases = await prisma.category.findUniqueOrThrow({ where: { slug: "bases" } });
  const almohadas = await prisma.category.findUniqueOrThrow({ where: { slug: "almohadas" } });

  const products = [
    {
      name: "Colchón Ortopédico Matrimonial",
      categoryId: colchones.id,
      mattressSize: "Matrimonial",
      mattressType: "Ortopédico",
      firmness: "Firme",
      price: 280,
      previousPrice: 330,
      isFeatured: true,
      isPromotion: true
    },
    {
      name: "Colchón Pillow Top Queen",
      categoryId: colchones.id,
      mattressSize: "Queen",
      mattressType: "Pillow Top",
      firmness: "Semi-firme",
      price: 420,
      isFeatured: true,
      isPromotion: false
    },
    {
      name: "Base Tapizada Individual",
      categoryId: bases.id,
      mattressSize: "Individual",
      mattressType: "Base tapizada",
      firmness: null,
      price: 120,
      isFeatured: true,
      isPromotion: false
    },
    {
      name: "Almohada Viscoelástica Premium",
      categoryId: almohadas.id,
      mattressSize: null,
      mattressType: "Memory foam",
      firmness: "Suave",
      price: 45,
      previousPrice: 60,
      isFeatured: true,
      isPromotion: true
    }
  ];

  for (const [index, product] of products.entries()) {
    const slug = slugify(product.name);
    const searchableContent = [
      product.name,
      product.mattressSize,
      product.mattressType,
      product.firmness,
      "garantía",
      "WhatsApp",
      "descanso"
    ]
      .filter(Boolean)
      .join(" | ");

    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        ...product,
        slug,
        brandId: brand.id,
        currency: "USD",
        stockQuantity: 10,
        shortDescription: "Producto recomendado para mejorar tu descanso con asesoría personalizada.",
        longDescription: "Disponible para consulta directa por WhatsApp. Te ayudamos a validar medida, firmeza, disponibilidad y forma de entrega.",
        features: ["Asesoría personalizada", "Disponible para retiro o delivery", "Excelente relación precio-calidad"],
        materials: ["Tela suave", "Espuma de alta densidad", "Componentes seleccionados"],
        warranty: "Garantía según condiciones del fabricante.",
        careInstructions: "Rotar periódicamente y proteger de humedad directa.",
        seoTitle: product.name,
        seoDescription: "Consulta precio, disponibilidad, medida y garantía por WhatsApp.",
        searchableContent,
        sortOrder: index,
        images: {
          create: [{ imageUrl: `/images/product-${index + 1}.png`, altText: product.name, sortOrder: 0, isMain: true }]
        }
      }
    });
  }

  const slides = [
    ["Encuentra el colchón ideal para tu descanso", "Modelos individuales, matrimoniales, queen y king con asesoría directa."],
    ["Promociones especiales en productos seleccionados", "Consulta disponibilidad y precio actualizado por WhatsApp."],
    ["Descanso cómodo para cada presupuesto", "Te ayudamos a comparar firmeza, medida y materiales."]
  ];

  for (const [index, [title, subtitle]] of slides.entries()) {
    await prisma.heroSlide.upsert({
      where: { id: `slide-${index + 1}` },
      update: {},
      create: {
        id: `slide-${index + 1}`,
        title,
        subtitle,
        imageUrl: `/images/hero-${index + 1}.png`,
        buttonLabel: index === 1 ? "Ver promociones" : "Ver catálogo",
        buttonUrl: index === 1 ? "/promociones" : "/productos",
        secondaryButtonLabel: "WhatsApp",
        secondaryButtonUrl: "https://wa.me/584120000000",
        sortOrder: index
      }
    });
  }

  const faqs = [
    ["¿Hacen delivery?", "Sí. La disponibilidad y costo del delivery se confirma según zona y producto."],
    ["¿Tienen garantía?", "Sí. La garantía depende del producto y se informa antes de la compra."],
    ["¿Aceptan pago móvil?", "Sí. También podemos configurar otros métodos de pago por cliente."],
    ["¿Puedo consultar por WhatsApp?", "Sí. WhatsApp es el canal principal para asesoría y cotizaciones rápidas."]
  ];

  for (const [index, [question, answer]] of faqs.entries()) {
    await prisma.fAQ.upsert({
      where: { id: `faq-${index + 1}` },
      update: {},
      create: { id: `faq-${index + 1}`, question, answer, sortOrder: index }
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
