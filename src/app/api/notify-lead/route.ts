import { NextRequest, NextResponse } from "next/server";

const WHATSAPP_API_VERSION = "v21.0";
const TEMPLATE_NAME = process.env.WHATSAPP_TEMPLATE_NAME || "novo_lead_quiz";

export async function POST(req: NextRequest) {
  const { name, answers } = (await req.json()) as { name?: string; answers?: string[] };

  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.WHATSAPP_RECIPIENT_NUMBER;

  if (!accessToken || !phoneNumberId || !recipient) {
    return NextResponse.json(
      { error: "WhatsApp API not configured" },
      { status: 503 }
    );
  }

  if (!name || !answers) {
    return NextResponse.json({ error: "Missing name or answers" }, { status: 400 });
  }

  const res = await fetch(
    `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: recipient,
        type: "template",
        template: {
          name: TEMPLATE_NAME,
          language: { code: "pt_BR" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: name },
                { type: "text", text: answers.join(" · ") },
              ],
            },
          ],
        },
      }),
    }
  );

  if (!res.ok) {
    const errorBody = await res.text();
    return NextResponse.json(
      { error: "WhatsApp API request failed", details: errorBody },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
