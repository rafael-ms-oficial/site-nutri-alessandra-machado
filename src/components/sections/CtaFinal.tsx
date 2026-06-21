import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WHATSAPP_LINK } from "@/lib/contact";
import { MessageCircle } from "lucide-react";

export function CtaFinal() {
  return (
    <section
      id="contato"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #7A2F2F 0%, #5c2020 100%)" }}
    >
      {/* Background blobs */}
      <div
        className="absolute -top-24 -right-24 w-[480px] h-[480px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #D2B09F 0%, transparent 70%)",
          borderRadius: "60% 40% 55% 45% / 55% 45% 60% 40%",
        }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-[360px] h-[360px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FAF7F2 0%, transparent 70%)",
          borderRadius: "40% 60% 45% 55% / 45% 55% 40% 60%",
        }}
      />

      <Container>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="font-poppins text-sm font-medium tracking-widest uppercase text-[#D2B09F] block mb-4">
            Comece hoje
          </span>

          <h2
            className="font-cormorant font-bold text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Sua jornada funcional
            <br />
            começa com uma{" "}
            <span className="italic text-[#D2B09F]">conversa</span>
          </h2>

          <p className="font-poppins text-[#F4EBE2]/80 leading-relaxed mb-10 text-base lg:text-lg max-w-xl mx-auto">
            Dê o primeiro passo. Sem compromisso, sem julgamento. Apenas uma
            conversa para entender como posso te ajudar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={WHATSAPP_LINK}
              size="lg"
              variant="secondary"
              icon={<MessageCircle size={20} />}
              external
              className="text-base"
            >
              Conversar no WhatsApp
            </Button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-white/10">
            {[
              { icon: "🔒", text: "Atendimento sigiloso" },
              { icon: "💚", text: "Sem dietas restritivas" },
              { icon: "🌍", text: "Online para todo o mundo" },
              { icon: "⭐", text: "98% de satisfação" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="font-poppins text-sm text-[#F4EBE2]/70">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
