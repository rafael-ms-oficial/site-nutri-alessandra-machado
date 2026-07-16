"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CRN_LABEL, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_LINK } from "@/lib/contact";
import { handleHashLinkClick } from "@/lib/scrollToHash";
import { MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2A2A2A] text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-cormorant font-bold text-2xl text-[#D2B09F] mb-1">
              Dra. Alessandra Machado
            </div>
            <p className="font-poppins text-xs text-white/50 uppercase tracking-widest mb-4">
              Nutricionista
            </p>
            <p className="font-poppins text-sm text-white/60 leading-relaxed">
              Transformando a relação das mulheres com a alimentação de forma leve,
              humanizada e sustentável.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-poppins text-xs font-medium uppercase tracking-widest text-[#D2B09F] mb-4">
              Navegação
            </p>
            <ul className="space-y-2">
              {[
                { label: "Início", href: "/" },
                { label: "Sobre", href: "/#sobre" },
                { label: "Serviços", href: "/#servicos" },
                { label: "Blog", href: "/blog" },
                { label: "Análise Funcional Gratuita", href: "/#quiz" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleHashLinkClick(e, link.href)}
                    className="font-poppins text-sm text-white/60 hover:text-[#D2B09F] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-poppins text-xs font-medium uppercase tracking-widest text-[#D2B09F] mb-4">
              Contato
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-poppins text-sm text-white/60 hover:text-[#D2B09F] transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-poppins text-sm text-white/60 hover:text-[#D2B09F] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
                @{INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-poppins text-xs text-white/40">
            © {new Date().getFullYear()} Dra. Alessandra Machado — Nutricionista. Todos os direitos reservados.
          </p>
          <p className="font-poppins text-xs text-white/30">
            {CRN_LABEL}
          </p>
        </div>
      </Container>
    </footer>
  );
}
