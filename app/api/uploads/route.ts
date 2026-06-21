import { NextResponse } from "next/server";
import { saveUploadedImage } from "@/lib/upload";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ success: false, error: "Archivo requerido" }, { status: 400 });
  try {
    const url = await saveUploadedImage(file, String(form.get("folder") ?? "products"));
    return NextResponse.json({ success: true, data: { url } });
  } catch {
    return NextResponse.json({ success: false, error: "Tipo o tamaño de imagen inválido" }, { status: 400 });
  }
}
