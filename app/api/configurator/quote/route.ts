import { NextResponse } from "next/server";
import { configuratorSchema } from "@/lib/validators/configurator";
import { buildConfiguratorWhatsAppMessage } from "@/lib/whatsapp";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = configuratorSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Configuración inválida", issues: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    data: {
      summary: parsed.data,
      whatsappMessage: buildConfiguratorWhatsAppMessage(parsed.data)
    }
  });
}
