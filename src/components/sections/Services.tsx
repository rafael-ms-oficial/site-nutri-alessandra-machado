import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M8 6h32v36H8z" rx="4" stroke="#7A2F2F" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 16h16M16 22h16M16 28h10" stroke="#D2B09F" strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="38" r="8" fill="#F4EBE2" stroke="#7A2F2F" strokeWidth="1.5" />
        <path d="M33 38l2 2 4-4" stroke="#7A2F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Consulta Nutricional Avulsa",
    description:
      "Avaliação completa do seu estado nutricional e comportamento alimentar para criar um plano totalmente personalizado.",
    highlight: "Mais popular",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="24" cy="24" r="16" stroke="#7A2F2F" strokeWidth="2" />
        <path d="M24 14v10l6 4" stroke="#D2B09F" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 36l-4 4M31 36l4 4" stroke="#7A2F2F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Acompanhamento Nutricional",
    description:
      "Planos de acompanhamento com suporte contínuo via WhatsApp, tirando dúvidas e ajustando conforme sua evolução.",
    highlight: null,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M24 6 C14 6, 6 14, 6 24 C6 34, 14 42, 24 42 C34 42, 42 34, 42 24" stroke="#7A2F2F" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 8 C38 12, 42 18, 42 24" stroke="#D2B09F" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 22 C20 18, 24 20, 24 24 C24 28, 28 30, 30 26" stroke="#7A2F2F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Plano Alimentar Personalizado",
    description:
      "Cardápio adaptado às suas preferências, rotina e objetivos — prático e realista para sua vida.",
    highlight: null,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M24 8 L28 18 L40 18 L30 26 L34 38 L24 30 L14 38 L18 26 L8 18 L20 18Z" stroke="#7A2F2F" strokeWidth="2" fill="none" strokeLinejoin="round" />
        <path d="M24 16 L26 22 L32 22 L27 26 L29 32 L24 28 L19 32 L21 26 L16 22 L22 22Z" fill="#F4EBE2" />
      </svg>
    ),
    title: "Emagrecimento Saudável",
    description:
      "Protocolo focado em perda de peso sustentável, sem restrições absurdas, com foco em hábitos duradouros.",
    highlight: null,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M24 10 C18 10, 12 16, 12 22 C12 28, 18 38, 24 42 C30 38, 36 28, 36 22 C36 16, 30 10, 24 10Z" stroke="#7A2F2F" strokeWidth="2" />
        <path d="M20 22 C20 20, 22 18, 24 18 C26 18, 28 20, 28 22 C28 24, 26 26, 24 26 C22 26, 20 24, 20 22Z" fill="#D2B09F" />
      </svg>
    ),
    title: "Saúde Intestinal",
    description:
      "Tratamento especializado do microbioma intestinal — base da imunidade, bem-estar mental e controle de peso.",
    highlight: null,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="8" y="14" width="32" height="26" rx="4" stroke="#7A2F2F" strokeWidth="2" />
        <path d="M16 14V10a8 8 0 0116 0v4" stroke="#D2B09F" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 28l3 3 6-6" stroke="#7A2F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Análise Funcional de Exames",
    description:
      "Interpretação dos seus exames laboratoriais sob a ótica da nutrição funcional para uma abordagem ainda mais precisa.",
    highlight: null,
  },
];

export function Services() {
  return (
    <SectionWrapper id="servicos">
      <Container>
        <SectionTitle
          eyebrow="Serviços"
          title="Como posso te ajudar"
          subtitle="Cada atendimento é único, pensado para a sua realidade e objetivos de vida."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`relative bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(122,47,47,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(122,47,47,0.14)] group ${
                i === 0 ? "border-2 border-[#7A2F2F]" : "border border-[#F4EBE2]"
              }`}
            >
              {service.highlight && (
                <span className="absolute -top-3 left-6 bg-[#7A2F2F] text-white text-xs font-poppins font-medium px-3 py-1 rounded-full">
                  {service.highlight}
                </span>
              )}

              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-[#F4EBE2]"
                style={{ background: "#FAF7F2" }}
              >
                {service.icon}
              </div>

              <h3 className="font-cormorant font-bold text-[#2A2A2A] text-xl mb-2">
                {service.title}
              </h3>
              <p className="font-poppins text-sm text-[#6B6B6B] leading-relaxed">
                {service.description}
              </p>

              <div className="mt-4 flex items-center gap-1 text-[#7A2F2F] text-sm font-poppins font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Saiba mais <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            href="#quiz"
            size="lg"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            Quero minha análise funcional
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
