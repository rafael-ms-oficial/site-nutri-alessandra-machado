import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

const highlights = [
  "Especialista em comportamento alimentar feminino",
  "Abordagem sem dietas restritivas ou proibições",
  "Foco em saúde intestinal e emagrecimento sustentável",
  "Atendimento online e presencial em todo o Brasil",
  "Mais de 1.000 pacientes atendidas com sucesso",
];

export function About() {
  return (
    <SectionWrapper id="sobre" background="beige">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative flex justify-center order-2 lg:order-1">
            {/* Background shape */}
            <div
              className="absolute inset-0 m-8"
              style={{
                background: "linear-gradient(135deg, #F4EBE2 0%, #D2B09F 100%)",
                borderRadius: "40% 60% 45% 55% / 45% 55% 40% 60%",
              }}
            />

            {/* Photo placeholder */}
            <div
              className="relative w-64 h-72 md:w-80 md:h-96 overflow-hidden shadow-[0_24px_64px_rgba(122,47,47,0.15)]"
              style={{
                borderRadius: "40% 60% 45% 55% / 45% 55% 40% 60%",
              }}
            >
              <Image
                src="/imagens/dr-alessandra-about.jpg"
                alt="Dra. Alessandra Machado"
                fill
                sizes="(min-width: 768px) 20rem, 16rem"
                className="object-cover"
              />
            </div>

            {/* Credential badge */}
            <div className="absolute bottom-4 -right-4 lg:right-0 bg-[#7A2F2F] rounded-2xl shadow-lg px-5 py-4 text-white max-w-xs">
              <p className="font-poppins text-xs opacity-80 mb-1">CRN-X · 00000</p>
              <p className="font-cormorant font-bold text-xl leading-tight">
                Nutricionista
                <br />
                Registrada
              </p>
            </div>

            {/* Floating tag */}
            <div
              className="absolute top-4 -left-4 lg:-left-8 bg-white rounded-2xl shadow-[0_8px_32px_rgba(122,47,47,0.10)] px-4 py-3 animate-float"
            >
              <p className="font-poppins text-xs text-[#6B6B6B]">Experiência</p>
              <p className="font-cormorant font-bold text-[#7A2F2F] text-xl">8+ anos</p>
            </div>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <span className="font-poppins text-sm font-medium tracking-widest uppercase text-[#D2B09F] block mb-3">
                Sobre a profissional
              </span>
              <h2
                className="font-cormorant font-bold text-[#7A2F2F] leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Dra. Alessandra Machado
              </h2>
            </div>

            <p className="font-poppins text-[#6B6B6B] leading-relaxed text-sm lg:text-base">
              Nutricionista especialista em emagrecimento feminino, saúde intestinal e
              comportamento alimentar. Minha missão é ajudar mulheres a transformarem sua
              relação com a comida de forma <strong className="text-[#2A2A2A]">leve, prazerosa e sustentável</strong>.
            </p>

            <p className="font-poppins text-[#6B6B6B] leading-relaxed text-sm lg:text-base">
              Acredito que uma alimentação saudável não deve ser sinônimo de sofrimento ou
              privação. Cada mulher merece um plano que respeite sua realidade, suas
              preferências e seu ritmo de vida.
            </p>

            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#7A2F2F] mt-0.5 shrink-0" />
                  <span className="font-poppins text-sm text-[#2A2A2A]">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              href="#quiz"
              size="lg"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
            >
              Agendar minha consulta
            </Button>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
