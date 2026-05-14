import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";

// Static sample post — in production this fetches from Supabase
const samplePost = {
  title: "Como perder peso sem seguir dietas restritivas",
  category: "Emagrecimento",
  readTime: "5 min",
  date: "20 Abr 2025",
  author: "Dra. Alessandra Machado",
  emoji: "⚖️",
  content: `
    <p>A busca pelo peso ideal muitas vezes leva as pessoas a adotarem dietas cada vez mais restritivas — e cada vez mais insustentáveis. O problema é que esse ciclo de restrição, queda, culpa e nova restrição cria uma relação tóxica com a comida que sabota os resultados a longo prazo.</p>

    <h2>Por que as dietas restritivas falham</h2>
    <p>Quando você restringe drasticamente a alimentação, o corpo interpreta isso como uma ameaça e ativa mecanismos de sobrevivência: diminui o metabolismo, aumenta a sensação de fome e eleva o desejo por alimentos calóricos. É biologia, não falta de força de vontade.</p>

    <h2>A abordagem comportamental</h2>
    <p>Em vez de ditar o que você pode ou não pode comer, trabalho com você para entender os gatilhos emocionais que levam a escolhas alimentares menos saudáveis. Quando entendemos o "porquê", fica muito mais fácil fazer escolhas conscientes.</p>

    <h2>Princípios que uso com minhas pacientes</h2>
    <ul>
      <li><strong>Comer com atenção plena</strong> — sem tela, saboreando cada mordida</li>
      <li><strong>Reconhecer fome e saciedade</strong> — o corpo sabe, precisamos aprender a ouvir</li>
      <li><strong>Sem alimentos proibidos</strong> — a proibição aumenta o desejo</li>
      <li><strong>Consistência, não perfeição</strong> — uma refeição não define seu resultado</li>
    </ul>

    <h2>Resultados reais e duradouros</h2>
    <p>As pacientes que trabalham comigo com essa abordagem não apenas atingem seu peso ideal — elas mantêm os resultados. Porque não é uma dieta que tem prazo de validade, é uma mudança de vida.</p>
  `,
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = samplePost; // TODO: fetch from Supabase by slug

  const whatsappMsg = encodeURIComponent(
    `Olá Dra. Alessandra! Li o artigo "${post.title}" e gostaria de agendar uma consulta.`
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <div
          className="py-16 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #F4EBE2 0%, #FAF7F2 100%)" }}
        >
          <Container narrow>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-poppins text-sm text-[#6B6B6B] hover:text-[#7A2F2F] transition-colors mb-6"
            >
              <ArrowLeft size={16} /> Voltar ao blog
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-poppins text-xs font-medium px-3 py-1 rounded-full bg-[#7A2F2F]/10 text-[#7A2F2F]">
                {post.category}
              </span>
              <span className="flex items-center gap-1 font-poppins text-xs text-[#A0A0A0]">
                <Clock size={12} /> {post.readTime}
              </span>
            </div>

            <h1
              className="font-cormorant font-bold text-[#7A2F2F] leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              {post.title}
            </h1>

            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-poppins font-medium"
                style={{ background: "linear-gradient(135deg, #7A2F2F, #D2B09F)" }}
              >
                A
              </div>
              <div>
                <p className="font-poppins text-sm font-medium text-[#2A2A2A]">{post.author}</p>
                <p className="font-poppins text-xs text-[#A0A0A0]">{post.date}</p>
              </div>
            </div>
          </Container>
        </div>

        {/* Content */}
        <Container narrow className="mt-12">
          <div
            className="prose prose-lg max-w-none font-poppins text-[#2A2A2A]
              [&_h2]:font-cormorant [&_h2]:font-bold [&_h2]:text-[#7A2F2F] [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4
              [&_p]:text-[#6B6B6B] [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:space-y-2 [&_ul]:mb-4
              [&_li]:text-[#6B6B6B] [&_li]:text-sm
              [&_strong]:text-[#2A2A2A]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA after article */}
          <div
            className="mt-16 p-8 rounded-3xl text-center"
            style={{ background: "linear-gradient(135deg, #7A2F2F 0%, #5c2020 100%)" }}
          >
            <h3 className="font-cormorant font-bold text-white text-2xl mb-3">
              Quer aplicar isso na sua vida?
            </h3>
            <p className="font-poppins text-sm text-white/70 mb-6 max-w-md mx-auto">
              Agende uma consulta e receba um plano totalmente personalizado para a sua realidade.
            </p>
            <Button
              href={`https://wa.me/5500000000000?text=${whatsappMsg}`}
              variant="secondary"
              size="lg"
              icon={<MessageCircle size={18} />}
              external
            >
              Falar com a Dra. Alessandra
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
