import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Quiz } from "@/components/sections/Quiz";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CtaFinal } from "@/components/sections/CtaFinal";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <About />
        <Quiz />
        <BlogPreview />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
