#!/usr/bin/env node
/*
  Generate Mobili Top image assets with Azure OpenAI GPT Image 2.

  SECURITY:
  - Do not hardcode keys in this file.
  - Provide the key at runtime with AZURE_OPENAI_IMAGE_API_KEY.
  - Optional endpoint override: AZURE_OPENAI_IMAGE_ENDPOINT.

  Usage:
    AZURE_OPENAI_IMAGE_API_KEY='[REDACTED]' npm run images:generate

  Optional:
    FORCE_IMAGE_REGEN=1 AZURE_OPENAI_IMAGE_API_KEY='[REDACTED]' npm run images:generate
*/

const fs = require("node:fs/promises");
const path = require("node:path");

const endpoint = process.env.AZURE_OPENAI_IMAGE_ENDPOINT ?? "https://luisj-mew99zlv-swedencentral.cognitiveservices.azure.com/openai/deployments/gpt-image-2/images/generations?api-version=2024-02-01";
const apiKey = process.env.AZURE_OPENAI_IMAGE_API_KEY;
const force = process.env.FORCE_IMAGE_REGEN === "1";
const root = process.cwd();

const baseStyle = "Mobili Top CCS Venezuela custom furniture and mattress brand, premium modern Latin American showroom, navy blue and warm beige palette, natural light, realistic ecommerce photography, no text, no watermark, no people, high-end catalog image";

const assets = [
  { file: "public/images/hero-1.png", size: "1792x1024", prompt: `${baseStyle}, hero banner with elegant mattresses, bed bases, pillows and a cozy bedroom showroom composition` },
  { file: "public/images/hero-2.png", size: "1792x1024", prompt: `${baseStyle}, custom sofa and upholstered bed workshop showroom, premium fabrics displayed, aspirational homepage banner` },
  { file: "public/images/hero-3.png", size: "1792x1024", prompt: `${baseStyle}, delivery-ready furniture showroom with mattresses and upholstered bases, clean spacious retail scene` },
  { file: "public/images/category-colchones.png", size: "1024x1024", prompt: `${baseStyle}, square category image showing premium mattress on styled bed, crisp product catalog composition` },
  { file: "public/images/category-bases.png", size: "1024x1024", prompt: `${baseStyle}, square category image showing upholstered bed base, neutral room, ecommerce category card` },
  { file: "public/images/category-almohadas.png", size: "1024x1024", prompt: `${baseStyle}, square category image with premium pillows and bedding, soft comfortable textures` },
  { file: "public/images/category-protectores.png", size: "1024x1024", prompt: `${baseStyle}, square category image showing mattress protector and clean white bedding, fresh hygienic feel` },
  { file: "public/images/category-muebles.png", size: "1024x1024", prompt: `${baseStyle}, square category image with custom upholstered sofa and headboard, furniture fabrication style` },
  { file: "public/images/category-promociones.png", size: "1024x1024", prompt: `${baseStyle}, square promotional ecommerce image with mattress and pillows arranged as a bundle, no text` },
  { file: "public/images/product-1.png", size: "1024x1024", prompt: `${baseStyle}, isolated premium orthopedic matrimonial mattress on simple showroom background, ecommerce product image` },
  { file: "public/images/product-2.png", size: "1024x1024", prompt: `${baseStyle}, isolated pillow top queen mattress with plush top detail, ecommerce product image` },
  { file: "public/images/product-3.png", size: "1024x1024", prompt: `${baseStyle}, isolated upholstered individual bed base in beige fabric, ecommerce product image` },
  { file: "public/images/product-4.png", size: "1024x1024", prompt: `${baseStyle}, isolated premium memory foam pillow with clean bedding, ecommerce product image` },
  { file: "public/images/product-placeholder.png", size: "1024x1024", prompt: `${baseStyle}, generic premium furniture and mattress placeholder composition, catalog safe image` },
  { file: "public/images/about-showroom.png", size: "1792x1024", prompt: `${baseStyle}, warm showroom interior with mattresses, sofas, bed bases and fabric samples, about page image` },
  { file: "public/images/contact-storefront.png", size: "1792x1024", prompt: `${baseStyle}, friendly storefront and consultation desk for furniture and mattress store, contact page image` },
  { file: "public/images/warranty-care.png", size: "1792x1024", prompt: `${baseStyle}, clean care and warranty scene with mattress, fabric swatches, measuring tape, premium service visual` },

  // Couch configurator MVP: 3 models × 2 fabrics × 3 colors = 18 prebuilt variations.
  ...["loveseat", "three-seat", "sectional"].flatMap((model) =>
    ["chenille", "linen"].flatMap((fabric) =>
      [
        ["beige", "warm beige"],
        ["gray", "medium warm gray"],
        ["navy", "deep navy blue"]
      ].map(([colorSlug, colorName]) => ({
        file: `public/images/configurator/couches/${model}-${fabric}-${colorSlug}.png`,
        size: "1024x1024",
        prompt: `${baseStyle}, isolated custom ${model === "loveseat" ? "two-seat loveseat" : model === "three-seat" ? "three-seat sofa" : "L-shaped sectional sofa"}, ${fabric} fabric texture, ${colorName} upholstery, front three-quarter view, consistent ecommerce configurator image, no text`
      }))
    )
  )
];

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function extractBase64(json) {
  const item = json?.data?.[0];
  return item?.b64_json ?? item?.base64 ?? item?.image_base64 ?? item?.content_filter_results?.b64_json;
}

function extractUrl(json) {
  const item = json?.data?.[0];
  return item?.url ?? item?.image_url;
}

async function generate(asset, index, total) {
  const outputPath = path.join(root, asset.file);
  await ensureDir(outputPath);

  if (!force && await exists(outputPath)) {
    console.log(`[skip ${index}/${total}] ${asset.file} exists`);
    return;
  }

  const payload = {
    prompt: asset.prompt,
    n: 1,
    size: asset.size
  };

  console.log(`[generate ${index}/${total}] ${asset.file}`);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const raw = await response.text();
  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    json = null;
  }

  if (!response.ok) {
    const safeBody = raw.slice(0, 800).replace(apiKey, "[REDACTED]");
    throw new Error(`Azure image generation failed for ${asset.file}: HTTP ${response.status} ${response.statusText}\n${safeBody}`);
  }

  const b64 = extractBase64(json);
  if (b64) {
    await fs.writeFile(outputPath, Buffer.from(b64, "base64"));
    console.log(`[saved] ${asset.file}`);
    return;
  }

  const imageUrl = extractUrl(json);
  if (imageUrl) {
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Generated image URL download failed for ${asset.file}: HTTP ${imageResponse.status}`);
    }
    const buffer = Buffer.from(await imageResponse.arrayBuffer());
    await fs.writeFile(outputPath, buffer);
    console.log(`[downloaded] ${asset.file}`);
    return;
  }

  throw new Error(`No image payload found for ${asset.file}. Response keys: ${Object.keys(json ?? {}).join(", ")}`);
}

async function main() {
  if (!apiKey) {
    console.error("Missing AZURE_OPENAI_IMAGE_API_KEY environment variable.");
    console.error("Run: AZURE_OPENAI_IMAGE_API_KEY='[REDACTED]' npm run images:generate");
    process.exit(1);
  }

  console.log(`Generating ${assets.length} assets with Azure OpenAI image endpoint.`);
  console.log(`Endpoint: ${endpoint.replace(/\/deployments\/([^/]+)\//, "/deployments/[deployment]/")}`);

  for (let i = 0; i < assets.length; i += 1) {
    await generate(assets[i], i + 1, assets.length);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    endpoint: endpoint.replace(/\/deployments\/([^/]+)\//, "/deployments/[deployment]/"),
    count: assets.length,
    assets: assets.map(({ file, size, prompt }) => ({ file, size, prompt }))
  };

  await fs.writeFile(path.join(root, "public/images/generated-assets-manifest.json"), JSON.stringify(manifest, null, 2));
  console.log("Done. Manifest written to public/images/generated-assets-manifest.json");
}

main().catch((error) => {
  console.error(error.message.replace(apiKey ?? "", "[REDACTED]"));
  process.exit(1);
});
