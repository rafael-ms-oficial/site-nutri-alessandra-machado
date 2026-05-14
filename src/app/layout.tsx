import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dra. Alessandra Machado | Nutricionista",
  description:
    "Transforme sua relação com a alimentação de forma leve e sustentável. Abordagem personalizada, sem dietas restritivas, focada em consistência e estilo de vida.",
  keywords: ["nutricionista", "emagrecimento", "saúde intestinal", "comportamento alimentar"],
  openGraph: {
    title: "Dra. Alessandra Machado | Nutricionista",
    description: "Transforme sua relação com a alimentação de forma leve e sustentável.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${poppins.variable}`}>
      <body className="min-h-full antialiased" style={{ backgroundColor: "#FAF7F2", color: "#2A2A2A" }}>
        {children}
      </body>
    </html>
  );
}
