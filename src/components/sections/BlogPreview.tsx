import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Clock } from "lucide-react";

const mockPosts = [
  {
    slug: "como-perder-peso-sem-dieta",
    category: "Emagrecimento",
    title: "Como perder peso sem seguir dietas restritivas",
    excerpt:
      "Descubra como uma abordagem baseada em comportamento alimentar pode ser mais eficaz e duradoura do que qualquer dieta da moda.",
    readTime: "5 min",
    date: "20 Apr 2025",
  },
  {
    slug: "saude-intestinal-imunidade",
    category: "Saúde Intestinal",
    title: "A conexão entre saúde intestinal e seu bem-estar geral",
    excerpt:
      "O intestino é o segundo cérebro do corpo. Entenda como cuidar do seu microbioma pode transformar sua saúde de dentro para fora.",
    readTime: "7 min",
    date: "15 Apr 2025",
  },
  {
    slug: "ansiedade-comida-comportamento",
    category: "Comportamento Alimentar",
    title: "Ansiedade e comida: como quebrar o ciclo emocional",
    excerpt:
      "Comer por ansiedade é mais comum do que você imagina. Veja as estratégias que uso com minhas pacientes para reconhecer e tratar esse padrão.",
    readTime: "6 min",
    date: "10 Apr 2025",
  },
];

const categoryColors: Record<string, string> = {
  Emagrecimento: "bg-[#7A2F2F]/10 text-[#7A2F2F]",
  "Saúde Intestinal": "bg-[#D2B09F]/20 text-[#b89080]",
  "Comportamento Alimentar": "bg-[#F4EBE2] text-[#6B6B6B]",
};

export function BlogPreview() {
  return (
    <SectionWrapper background="pink" id="blog">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <SectionTitle
            eyebrow="Blog"
            title="Conteúdo que transforma"
            subtitle="Dicas, ciência e praticidade para sua jornada de saúde."
          />
          <Button
            href="/blog"
            variant="secondary"
            size="sm"
            icon={<ArrowRight size={14} />}
            iconPosition="right"
            className="shrink-0 self-start md:self-auto"
          >
            Ver todos os artigos
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(122,47,47,0.08)] hover:shadow-[0_16px_48px_rgba(122,47,47,0.14)] transition-all duration-300 hover:-translate-y-1 flex flex-col`}
            >
              {/* Image placeholder */}
              <div
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(135deg, #7A2F2F 0%, #D2B09F 100%)"
                      : i === 1
                      ? "linear-gradient(135deg, #D2B09F 0%, #F4EBE2 100%)"
                      : "linear-gradient(135deg, #F4EBE2 0%, #D2B09F 100%)",
                }}
              >
                <span
                  className="font-cormorant font-bold opacity-20 text-white"
                  style={{ fontSize: "5rem" }}
                >
                  {["🌿", "🫀", "🧠"][i]}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`font-poppins text-xs font-medium px-2.5 py-1 rounded-full ${
                      categoryColors[post.category] || "bg-[#F4EBE2] text-[#6B6B6B]"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 font-poppins text-xs text-[#A0A0A0]">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-cormorant font-bold text-[#2A2A2A] text-xl mb-2 group-hover:text-[#7A2F2F] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="font-poppins text-xs text-[#6B6B6B] leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F4EBE2]">
                  <span className="font-poppins text-xs text-[#A0A0A0]">{post.date}</span>
                  <span className="flex items-center gap-1 font-poppins text-xs font-medium text-[#7A2F2F] group-hover:gap-2 transition-all">
                    Ler artigo <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
