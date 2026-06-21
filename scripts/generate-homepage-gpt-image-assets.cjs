#!/usr/bin/env node
/*
  Regenerate ONLY the customer-visible homepage category and product images
  with Azure OpenAI GPT Image 2.

  SECURITY:
  - Do not hardcode API keys in this file.
  - Provide the key at runtime with AZURE_OPENAI_IMAGE_API_KEY.
  - Optional endpoint override: AZURE_OPENAI_IMAGE_ENDPOINT.
*/

const fs = require("node:fs/promises");
const path = require("node:path");

const endpoint = process.env.AZURE_OPENAI_IMAGE_ENDPOINT ?? "https://luisj-mew99zlv-swedencentral.cognitiveservices.azure.com/openai/deployments/gpt-image-2/images/generations?api-version=2024-02-01";
const apiKey = process.env.AZURE_OPENAI_IMAGE_API_KEY;
const root = process.cwd();

const brandStyle = [
  "Mobili Top CCS Venezuela ecommerce photography",
  "premium mattress and custom furniture store",
  "realistic product photography",
  "clean showroom lighting",
  "navy blue, beige and warm wood accents",
  "front three-quarter catalog composition",
  "no people, no text, no watermark, no logos, no fake labels"
].join(", ");

const assets = [
  {
    file: "public/images/category-colchones.png",
    label: "Colchones",
    size: "1024x1024",
    prompt: `${brandStyle}. CATEGORY IMAGE FOR COLCHONES ONLY: show multiple premium mattresses on styled beds in a mattress showroom. The image must clearly communicate mattresses, not sofas, pillows alone, or generic furniture.`
  },
  {
    file: "public/images/category-bases.png",
    label: "Bases",
    size: "1024x1024",
    prompt: `${brandStyle}. CATEGORY IMAGE FOR BASES ONLY: show upholstered bed bases/platform bases without a tall headboard, beige and navy fabric options, mattress base foundation displayed clearly. The image must clearly communicate bed bases.`
  },
  {
    file: "public/images/category-almohadas.png",
    label: "Almohadas",
    size: "1024x1024",
    prompt: `${brandStyle}. CATEGORY IMAGE FOR ALMOHADAS ONLY: show several premium pillows with memory foam feel on clean bedding, soft white and beige textures. The image must clearly communicate pillows.`
  },
  {
    file: "public/images/category-protectores.png",
    label: "Protectores",
    size: "1024x1024",
    prompt: `${brandStyle}. CATEGORY IMAGE FOR PROTECTORES ONLY: show a white fitted mattress protector being displayed on a mattress, quilted waterproof protective layer visible, hygienic clean bedding. The image must clearly communicate mattress protectors.`
  },
  {
    file: "public/images/category-muebles.png",
    label: "Muebles",
    size: "1024x1024",
    prompt: `${brandStyle}. CATEGORY IMAGE FOR MUEBLES ONLY: show custom upholstered living room furniture, a modern sofa with matching headboard and ottoman in a showroom. The image must clearly communicate furniture, not mattresses.`
  },
  {
    file: "public/images/category-promociones.png",
    label: "Promociones",
    size: "1024x1024",
    prompt: `${brandStyle}. CATEGORY IMAGE FOR PROMOCIONES ONLY: show a promotional bundle of mattress, pillows and bed base arranged together like an offer display, with warm gold accent props but absolutely no written text. The image must clearly communicate a special offer bundle.`
  },
  {
    file: "public/images/product-1.png",
    label: "Colchón Ortopédico Matrimonial",
    size: "1024x1024",
    prompt: `${brandStyle}. EXACT PRODUCT PHOTO: Colchón Ortopédico Matrimonial. Show one firm orthopedic double/matrimonial mattress, clean white quilted top, supportive structure, on a simple low display base. Must look like a real product photo for a mattress listing.`
  },
  {
    file: "public/images/product-2.png",
    label: "Colchón Pillow Top Queen",
    size: "1024x1024",
    prompt: `${brandStyle}. EXACT PRODUCT PHOTO: Colchón Pillow Top Queen. Show one queen mattress with visible plush pillow-top layer and thick comfortable quilting, premium hotel style, isolated on showroom floor. Must look like a real product photo for a mattress listing.`
  },
  {
    file: "public/images/product-3.png",
    label: "Base Tapizada Individual",
    size: "1024x1024",
    prompt: `${brandStyle}. EXACT PRODUCT PHOTO: Base Tapizada Individual. Show one single/twin upholstered bed base foundation in beige fabric, rectangular platform base, no mattress covering it, clean ecommerce product photo. Must clearly be a bed base, not a full bed.`
  },
  {
    file: "public/images/product-4.png",
    label: "Almohada Viscoelástica Premium",
    size: "1024x1024",
    prompt: `${brandStyle}. EXACT PRODUCT PHOTO: Almohada Viscoelástica Premium. Show one premium contoured memory foam pillow with soft white cover, slight cutaway/texture hint, clean bedding surface. Must clearly be a pillow product photo.`
  }
];

function redact(value) {
  if (!value) return value;
  return String(value).replaceAll(apiKey ?? "", "[REDACTED]");
}

function extractBase64(json) {
  const item = json?.data?.[0];
  return item?.b64_json ?? item?.base64 ?? item?.image_base64;
}

function extractUrl(json) {
  const item = json?.data?.[0];
  return item?.url ?? item?.image_url;
}

async function generateAsset(asset, index) {
  const outputPath = path.join(root, asset.file);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const payload = { prompt: asset.prompt, n: 1, size: asset.size };
  console.log(`[generate ${index}/${assets.length}] ${asset.label} -> ${asset.file}`);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const raw = await response.text();
  let json = null;
  try { json = JSON.parse(raw); } catch {}

  if (!response.ok) {
    throw new Error(`Azure image generation failed for ${asset.file}: HTTP ${response.status} ${response.statusText}\n${redact(raw.slice(0, 1000))}`);
  }

  const b64 = extractBase64(json);
  if (b64) {
    await fs.writeFile(outputPath, Buffer.from(b64, "base64"));
    console.log(`[saved base64] ${asset.file}`);
    return;
  }

  const url = extractUrl(json);
  if (url) {
    const download = await fetch(url);
    if (!download.ok) throw new Error(`Download failed for ${asset.file}: HTTP ${download.status}`);
    await fs.writeFile(outputPath, Buffer.from(await download.arrayBuffer()));
    console.log(`[saved url] ${asset.file}`);
    return;
  }

  throw new Error(`No image payload found for ${asset.file}. Response: ${redact(raw.slice(0, 1000))}`);
}

async function main() {
  if (!apiKey) {
    console.error("Missing AZURE_OPENAI_IMAGE_API_KEY environment variable.");
    process.exit(1);
  }

  console.log(`Regenerating ${assets.length} homepage category/product assets with GPT Image 2.`);
  console.log(`Endpoint: ${endpoint.replace(/\/deployments\/([^/]+)\//, "/deployments/[deployment]/")}`);

  const generated = [];
  for (let i = 0; i < assets.length; i += 1) {
    await generateAsset(assets[i], i + 1);
    generated.push(assets[i].file);
  }

  const manifestPath = path.join(root, "public/images/homepage-gpt-image-assets-manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    generator: "Azure OpenAI GPT Image 2",
    endpoint: endpoint.replace(/\/deployments\/([^/]+)\//, "/deployments/[deployment]/"),
    status: "complete",
    generatedFiles: generated,
    notes: "Homepage category and featured/recommended product images regenerated with specific prompts. API key was supplied by environment variable only and is not stored."
  }, null, 2));

  console.log(`Done. Manifest written to ${path.relative(root, manifestPath)}`);
}

main().catch((error) => {
  console.error(redact(error.message));
  process.exit(1);
});
