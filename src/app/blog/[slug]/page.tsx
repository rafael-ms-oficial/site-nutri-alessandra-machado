import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WHATSAPP_LINK } from "@/lib/contact";
import { createClient } from "@/lib/supabase/server";
import { estimateReadTime, formatPostDate } from "@/lib/blog";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

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
                <Clock size={12} /> {estimateReadTime(post.content)}
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
                <p className="font-poppins text-xs text-[#A0A0A0]">{formatPostDate(post.created_at)}</p>
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
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
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
              href={WHATSAPP_LINK}
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
