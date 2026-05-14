"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "#contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_2px_24px_rgba(122,47,47,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 lg:h-24 items-center justify-between gap-4">

          {/* Logo — nunca encolhe */}
          <Link
            href="/"
            className="relative block h-16 w-52 shrink-0 transition-opacity hover:opacity-80 sm:w-60 lg:h-20 lg:w-72"
          >
            <Image
              src="/imagens/logo-navigation.png"
              alt="Dra. Alessandra Machado Nutricionista"
              fill
              priority
              sizes="(min-width: 1024px) 288px, (min-width: 640px) 240px, 208px"
              className="object-contain object-left"
            />
          </Link>

          {/* Desktop nav — aparece só em lg+ */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-poppins text-sm text-[#6B6B6B] hover:text-[#7A2F2F] transition-colors duration-200 whitespace-nowrap relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#7A2F2F] after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA — aparece em lg+, some antes disso */}
          {/* Hamburger — visível abaixo de lg */}
          <button
            className="lg:hidden p-2 text-[#7A2F2F] ml-auto"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      {open && (
        <div className="lg:hidden bg-[#FAF7F2]/98 backdrop-blur-md border-t border-[#F4EBE2] px-6 py-6 flex flex-col gap-4 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-poppins text-base text-[#2A2A2A] hover:text-[#7A2F2F] py-1 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
