"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/contact";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-transform duration-200"
      style={{ background: "#25D366" }}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={28} className="text-white fill-white" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7A2F2F] rounded-full animate-ping opacity-75" />
    </a>
  );
}
