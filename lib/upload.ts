import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export function validateImageFile(file: File) {
  const maxMb = Number(process.env.MAX_UPLOAD_SIZE_MB ?? 3);
  return allowedTypes.has(file.type) && file.size <= maxMb * 1024 * 1024;
}

export async function saveUploadedImage(file: File, folder = "products") {
  if (!validateImageFile(file)) throw new Error("Imagen inválida");
  const uploadRoot = process.env.UPLOAD_DIR ?? "./public/uploads";
  const uploadDir = path.join(uploadRoot, folder);
  await mkdir(uploadDir, { recursive: true });
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "")}`;
  await writeFile(path.join(uploadDir, safeName), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${folder}/${safeName}`;
}

export async function deleteUploadedImage(imagePath: string) {
  const uploadRoot = process.env.UPLOAD_DIR ?? "./public/uploads";
  const relativePath = imagePath.replace(/^\/uploads\//, "");
  await unlink(path.join(uploadRoot, relativePath));
}
