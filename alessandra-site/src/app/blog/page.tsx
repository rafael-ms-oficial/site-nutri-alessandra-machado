import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Container } from "@/components/ui/Container";
import { BlogGrid } from "@/components/blog/BlogGrid";

export const metadata = {
  title: "Blog | Dra. Alessandra Machado — Nutricionista",
  description: "Dicas, ciência e praticidade para transformar sua relação com a alimentação.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Header */}
        <div
          className="relative py-16 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #F4EBE2 0%, #FAF7F2 100%)" }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #D2B09F 0%, transparent 70%)",
              borderRadius: "60% 40% 55% 45% / 55% 45% 60% 40%",
            }}
          />
          <Container>
            <div className="max-w-2xl">
              <span className="font-poppins text-sm font-medium tracking-widest uppercase text-[#D2B09F] block mb-3">
                Blog
              </span>
              <h1
                className="font-cormorant font-bold text-[#7A2F2F] leading-tight mb-4"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Conteúdo que transforma
              </h1>
              <p className="font-poppins text-[#6B6B6B] leading-relaxed">
                Dicas práticas, ciência da nutrição e estratégias comportamentais para
                você ter uma relação mais leve e saudável com a comida.
              </p>
            </div>
          </Container>
        </div>

        <Container className="mt-12">
          <BlogGrid />
        </Container>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
