"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WHATSAPP_LINK } from "@/lib/contact";
import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FAF7F2] pt-20">
      {/* Background decorative blobs */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #D2B09F 0%, transparent 70%)",
          borderRadius: "60% 40% 55% 45% / 55% 45% 60% 40%",
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7A2F2F 0%, transparent 70%)",
          borderRadius: "40% 60% 45% 55% / 45% 55% 40% 60%",
        }}
      />

      {/* Floating leaves SVG */}
      <svg
        className="absolute top-20 right-8 opacity-15 w-48 h-48 pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 10 C60 10, 10 60, 10 100 C10 140, 60 190, 100 190 C140 190, 190 140, 190 100 C190 60, 140 10, 100 10Z"
          fill="#D2B09F"
          opacity="0.4"
        />
        <path d="M100 30 C100 30, 170 80, 100 170 C30 80, 100 30, 100 30Z" fill="#7A2F2F" opacity="0.3" />
      </svg>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-0">
          {/* Left content */}
          <div className="space-y-6 lg:space-y-8">
            <div
              className="inline-flex items-center gap-2 bg-[#F4EBE2] text-[#7A2F2F] rounded-full px-4 py-2 text-sm font-poppins font-medium opacity-0 animate-fade-up"
              style={{ animationFillMode: "forwards" }}
            >
              <span className="w-2 h-2 bg-[#7A2F2F] rounded-full animate-pulse" />
              Nutricionista com Especialização em Nutrição Clínica Funcional
            </div>

            <h1
              className="font-cormorant font-bold leading-tight text-[#2A2A2A] opacity-0 animate-fade-up delay-100"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                animationFillMode: "forwards",
              }}
            >
              Transforme sua relação com a alimentação de forma{" "}
              <span className="text-[#7A2F2F] italic">leve</span> e{" "}
              <span className="text-[#7A2F2F] italic">sustentável</span>
            </h1>

            <p
              className="font-poppins text-[#6B6B6B] leading-relaxed opacity-0 animate-fade-up delay-200"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", animationFillMode: "forwards" }}
            >
              Abordagem personalizada e humanizada, sem dietas restritivas. Focada em
              consistência, saúde intestinal e mudança real de estilo de vida.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up delay-300"
              style={{ animationFillMode: "forwards" }}
            >
              <Button href="#quiz" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                Quero minha análise funcional
              </Button>
              <Button
                href={WHATSAPP_LINK}
                variant="secondary"
                size="lg"
                icon={<MessageCircle size={18} />}
                external
              >
                Agendar via WhatsApp
              </Button>
            </div>

            {/* Trust badges */}
            <div
              className="flex flex-wrap gap-6 pt-4 opacity-0 animate-fade-up delay-400"
              style={{ animationFillMode: "forwards" }}
            >
              {[
                { value: "500+", label: "Histórias transformadas" },
                { value: "10 anos", label: "de experiência clínica" },
                { value: "98%", label: "satisfação" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-cormorant font-bold text-[#7A2F2F] text-2xl">{stat.value}</span>
                  <span className="font-poppins text-xs text-[#6B6B6B] uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — photo with organic shape */}
          <div
            className="relative flex justify-center lg:justify-end opacity-0 animate-fade-in delay-200"
            style={{ animationFillMode: "forwards" }}
          >
            {/* Outer decorative ring */}
            <div
              className="absolute inset-0 m-4"
              style={{
                border: "2px dashed #D2B09F",
                borderRadius: "60% 40% 55% 45% / 55% 45% 60% 40%",
                opacity: 0.5,
              }}
            />

            {/* Colored shape behind image */}
            <div
              className="absolute inset-8"
              style={{
                background: "linear-gradient(135deg, #F4EBE2 0%, #D2B09F 100%)",
                borderRadius: "55% 45% 60% 40% / 45% 60% 40% 55%",
              }}
            />

            {/* Photo placeholder — replace src with real image */}
            <div
              className="relative w-72 h-80 md:w-96 md:h-[28rem] overflow-hidden shadow-[0_24px_64px_rgba(122,47,47,0.2)]"
              style={{
                borderRadius: "55% 45% 60% 40% / 45% 60% 40% 55%",
              }}
            >
              <Image
                src="/imagens/dr-alessandra-header.jpg"
                alt="Dra. Alessandra Machado"
                fill
                priority
                sizes="(min-width: 768px) 24rem, 18rem"
                className="object-cover"
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute bottom-8 -left-4 lg:-left-12 bg-white rounded-2xl shadow-[0_8px_32px_rgba(122,47,47,0.12)] px-4 py-3 animate-float"
            >
              <p className="font-poppins text-xs text-[#6B6B6B]">Abordagem</p>
              <p className="font-cormorant font-bold text-[#7A2F2F] text-lg leading-tight">
                Humanizada
              </p>
            </div>

            {/* Floating badge 2 */}
            <div
              className="absolute top-8 -right-4 lg:-right-8 bg-[#7A2F2F] rounded-2xl shadow-[0_8px_32px_rgba(122,47,47,0.25)] px-4 py-3 animate-float delay-300"
            >
              <p className="font-poppins text-xs text-[#D2B09F]">Sem dietas</p>
              <p className="font-cormorant font-bold text-white text-lg leading-tight">
                Restritivas
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40 C240 80, 480 0, 720 40 C960 80, 1200 0, 1440 40 L1440 80 L0 80Z"
            fill="#F4EBE2"
          />
        </svg>
      </div>
    </section>
  );
}
