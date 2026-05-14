"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Star } from "lucide-react";

const stats = [
  { value: 1000, suffix: "+", label: "Histórias transformadas" },
  { value: 8, suffix: " anos", label: "de experiência clínica" },
  { value: 98, suffix: "%", label: "de satisfação" },
  { value: 3, suffix: "x", label: "mais resultados duradouros" },
];

const testimonials = [
  {
    name: "Ana Paula S.",
    text: "A Dra. Alessandra mudou completamente minha relação com a comida. Emagreci sem passar fome e me sinto muito melhor.",
    stars: 5,
  },
  {
    name: "Mariana C.",
    text: "Finalmente encontrei uma nutricionista que entende que cada pessoa é diferente. Recomendo demais!",
    stars: 5,
  },
  {
    name: "Fernanda L.",
    text: "Depois de anos tentando dietas restritivas, com a Dra. Alessandra aprendi a comer de forma saudável e prazerosa.",
    stars: 5,
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function SocialProof() {
  return (
    <SectionWrapper background="pink" id="resultados">
      <Container>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(122,47,47,0.08)] hover:shadow-[0_8px_40px_rgba(122,47,47,0.13)] transition-shadow duration-300"
            >
              <div
                className="font-cormorant font-bold text-[#7A2F2F]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-poppins text-sm text-[#6B6B6B] mt-1 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <span className="font-poppins text-sm font-medium tracking-widest uppercase text-[#D2B09F] block mb-3">
            Depoimentos
          </span>
          <h2
            className="font-cormorant font-bold text-[#7A2F2F]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Histórias que inspiram
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(122,47,47,0.08)] flex flex-col gap-4 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(122,47,47,0.14)] transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="fill-[#D2B09F] text-[#D2B09F]" />
                ))}
              </div>
              <p className="font-poppins text-sm text-[#6B6B6B] leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#F4EBE2]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-poppins font-medium"
                  style={{ background: "linear-gradient(135deg, #7A2F2F, #D2B09F)" }}
                >
                  {t.name[0]}
                </div>
                <span className="font-poppins text-sm font-medium text-[#2A2A2A]">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
