"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { CheckCircle, ArrowRight, ArrowLeft, MessageCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    question: "Qual é o seu principal objetivo?",
    options: [
      { label: "Emagrecer de forma saudável", emoji: "⚖️" },
      { label: "Melhorar minha saúde intestinal", emoji: "🌿" },
      { label: "Ganhar energia e disposição", emoji: "⚡" },
      { label: "Controlar minha relação com a comida", emoji: "🧠" },
    ],
  },
  {
    id: 2,
    question: "Qual é a sua maior dificuldade hoje?",
    options: [
      { label: "Não consigo manter uma dieta por muito tempo", emoji: "🔄" },
      { label: "Sinto muito desconforto digestivo", emoji: "😣" },
      { label: "Compulsão ou ansiedade com comida", emoji: "😥" },
      { label: "Não sei por onde começar", emoji: "❓" },
    ],
  },
  {
    id: 3,
    question: "Como você descreveria seu momento atual?",
    options: [
      { label: "Estou motivada e pronta para começar", emoji: "🔥" },
      { label: "Já tentei várias vezes e me frustrei", emoji: "💔" },
      { label: "Tenho medo de falhar de novo", emoji: "😰" },
      { label: "Quero mudanças mas não sei como", emoji: "🌱" },
    ],
  },
];

interface LeadData {
  name: string;
  phone: string;
  email: string;
}

export function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [lead, setLead] = useState<LeadData>({ name: "", phone: "", email: "" });
  const [phase, setPhase] = useState<"questions" | "lead" | "analyzing" | "done">("questions");
  const [errors, setErrors] = useState<Partial<LeadData>>({});

  const totalSteps = steps.length;
  const progress = ((currentStep) / totalSteps) * 100;

  function handleSelect(option: string) {
    setSelected(option);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setPhase("lead");
    }
  }

  function handleBack() {
    if (currentStep === 0) return;
    setCurrentStep((s) => s - 1);
    setSelected(answers[currentStep - 1] || null);
    setAnswers((a) => a.slice(0, -1));
  }

  function validateLead(): boolean {
    const errs: Partial<LeadData> = {};
    if (!lead.name.trim()) errs.name = "Informe seu nome";
    if (!lead.phone.replace(/\D/g, "").match(/^\d{10,11}$/))
      errs.phone = "WhatsApp inválido";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit() {
    if (!validateLead()) return;
    setPhase("analyzing");
    await new Promise((r) => setTimeout(r, 2500));
    setPhase("done");
  }

  const whatsappMsg = encodeURIComponent(
    `Olá Dra. Alessandra! Me chamo ${lead.name} e acabei de preencher o quiz no seu site. Meu objetivo é: ${answers[0]}. Gostaria de agendar minha consulta!`
  );

  return (
    <SectionWrapper background="pink" id="quiz">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="font-poppins text-sm font-medium tracking-widest uppercase text-[#D2B09F] block mb-3">
              Diagnóstico gratuito
            </span>
            <h2
              className="font-cormorant font-bold text-[#7A2F2F]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Descubra seu caminho ideal
            </h2>
            <p className="font-poppins text-sm text-[#6B6B6B] mt-3">
              Responda 3 perguntas e receba um direcionamento personalizado
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(122,47,47,0.10)] overflow-hidden">
            {/* Progress */}
            {phase === "questions" && (
              <div className="h-1.5 bg-[#F4EBE2]">
                <div
                  className="h-full bg-gradient-to-r from-[#7A2F2F] to-[#D2B09F] transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <div className="p-8">
              {/* QUESTIONS */}
              {phase === "questions" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-poppins text-xs text-[#6B6B6B]">
                      Etapa {currentStep + 1} de {totalSteps}
                    </span>
                    <div className="flex gap-1">
                      {Array.from({ length: totalSteps }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${
                            i <= currentStep ? "bg-[#7A2F2F]" : "bg-[#F4EBE2]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-cormorant font-bold text-[#2A2A2A] text-2xl mb-6">
                    {steps[currentStep].question}
                  </h3>

                  <div className="space-y-3">
                    {steps[currentStep].options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleSelect(opt.label)}
                        className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 font-poppins text-sm ${
                          selected === opt.label
                            ? "border-[#7A2F2F] bg-[#7A2F2F]/5 text-[#7A2F2F] font-medium"
                            : "border-[#F4EBE2] hover:border-[#D2B09F] text-[#2A2A2A]"
                        }`}
                      >
                        <span className="text-xl">{opt.emoji}</span>
                        <span>{opt.label}</span>
                        {selected === opt.label && (
                          <CheckCircle size={16} className="ml-auto text-[#7A2F2F]" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      icon={<ArrowLeft size={16} />}
                      iconPosition="left"
                    >
                      Voltar
                    </Button>
                    <Button
                      size="md"
                      onClick={handleNext}
                      disabled={!selected}
                      icon={<ArrowRight size={16} />}
                      iconPosition="right"
                    >
                      {currentStep < totalSteps - 1 ? "Próximo" : "Ver resultado"}
                    </Button>
                  </div>
                </div>
              )}

              {/* LEAD FORM */}
              {phase === "lead" && (
                <div>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-[#F4EBE2] flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h3 className="font-cormorant font-bold text-[#2A2A2A] text-2xl mb-2">
                      Quase lá!
                    </h3>
                    <p className="font-poppins text-sm text-[#6B6B6B]">
                      Deixe seus dados para receber seu direcionamento personalizado
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
                        Seu nome *
                      </label>
                      <input
                        type="text"
                        value={lead.name}
                        onChange={(e) => setLead({ ...lead, name: e.target.value })}
                        placeholder="Como prefere ser chamada?"
                        className={`w-full px-4 py-3 rounded-xl border font-poppins text-sm text-[#2A2A2A] bg-[#FAF7F2] placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 transition-all ${
                          errors.name ? "border-red-400" : "border-[#F4EBE2] focus:border-[#7A2F2F]"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={lead.phone}
                        onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                        placeholder="(00) 00000-0000"
                        className={`w-full px-4 py-3 rounded-xl border font-poppins text-sm text-[#2A2A2A] bg-[#FAF7F2] placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 transition-all ${
                          errors.phone ? "border-red-400" : "border-[#F4EBE2] focus:border-[#7A2F2F]"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
                        E-mail (opcional)
                      </label>
                      <input
                        type="email"
                        value={lead.email}
                        onChange={(e) => setLead({ ...lead, email: e.target.value })}
                        placeholder="seu@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#F4EBE2] font-poppins text-sm text-[#2A2A2A] bg-[#FAF7F2] placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 focus:border-[#7A2F2F] transition-all"
                      />
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full justify-center mt-6"
                    onClick={handleSubmit}
                  >
                    Receber meu direcionamento
                  </Button>

                  <p className="text-center font-poppins text-xs text-[#A0A0A0] mt-3">
                    🔒 Seus dados estão seguros. Não enviamos spam.
                  </p>
                </div>
              )}

              {/* ANALYZING */}
              {phase === "analyzing" && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-[#F4EBE2] flex items-center justify-center mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-[#7A2F2F]/20 border-t-[#7A2F2F] animate-spin" />
                    <span className="text-3xl">🌿</span>
                  </div>
                  <h3 className="font-cormorant font-bold text-[#2A2A2A] text-2xl mb-2">
                    Analisando suas respostas...
                  </h3>
                  <p className="font-poppins text-sm text-[#6B6B6B]">
                    Estamos preparando seu direcionamento personalizado
                  </p>
                  <div className="flex justify-center gap-2 mt-6">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#D2B09F] animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* DONE */}
              {phase === "done" && (
                <div className="text-center py-4">
                  <div className="w-20 h-20 rounded-full bg-[#F4EBE2] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-[#7A2F2F]" />
                  </div>
                  <h3 className="font-cormorant font-bold text-[#7A2F2F] text-2xl mb-3">
                    {lead.name}, seu diagnóstico está pronto!
                  </h3>
                  <p className="font-poppins text-sm text-[#6B6B6B] leading-relaxed mb-8 max-w-sm mx-auto">
                    Com base nas suas respostas, a Dra. Alessandra pode criar um plano totalmente
                    personalizado para você. Clique abaixo para conversar diretamente com ela.
                  </p>

                  <div
                    className="bg-[#FAF7F2] rounded-2xl p-4 mb-6 text-left space-y-2"
                  >
                    <p className="font-poppins text-xs font-medium text-[#7A2F2F] uppercase tracking-wide">
                      Seu perfil
                    </p>
                    {answers.map((a, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-[#D2B09F] mt-0.5 shrink-0" />
                        <span className="font-poppins text-xs text-[#6B6B6B]">{a}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    href={`https://wa.me/5500000000000?text=${whatsappMsg}`}
                    size="lg"
                    className="w-full justify-center"
                    icon={<MessageCircle size={18} />}
                    external
                  >
                    Falar com a Dra. Alessandra
                  </Button>

                  <p className="font-poppins text-xs text-[#A0A0A0] mt-3">
                    Resposta em até 24 horas úteis
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
