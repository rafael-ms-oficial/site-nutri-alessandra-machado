"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search } from "lucide-react";
import { Post } from "@/types";
import { categoryEmoji, estimateReadTime, formatPostDate } from "@/lib/blog";

const categories = ["Todos", "Emagrecimento", "Saúde Intestinal", "Comportamento Alimentar", "Nutrição"];

const categoryBg: Record<string, string> = {
  Emagrecimento: "bg-[#7A2F2F]/10 text-[#7A2F2F]",
  "Saúde Intestinal": "bg-[#D2B09F]/20 text-[#b89080]",
  "Comportamento Alimentar": "bg-[#F4EBE2] text-[#6B6B6B]",
  Nutrição: "bg-[#FAF7F2] border border-[#D2B09F] text-[#D2B09F]",
};

export function BlogGrid({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = posts.filter((post) => {
    const matchCat = activeCategory === "Todos" || post.category === activeCategory;
    const matchSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A0A0]" />
          <input
            type="text"
            placeholder="Buscar artigo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#F4EBE2] bg-white font-poppins text-sm text-[#2A2A2A] placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/20 focus:border-[#7A2F2F] transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-poppins text-sm px-4 py-2 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#7A2F2F] text-white border-[#7A2F2F]"
                  : "bg-white text-[#6B6B6B] border-[#F4EBE2] hover:border-[#D2B09F]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-cormorant text-2xl text-[#7A2F2F] mb-2">Nenhum artigo encontrado</p>
          <p className="font-poppins text-sm text-[#6B6B6B]">Tente outro termo ou categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(122,47,47,0.08)] hover:shadow-[0_16px_48px_rgba(122,47,47,0.14)] transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div
                className="h-44 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #F4EBE2 0%, #D2B09F 100%)",
                }}
              >
                <span style={{ fontSize: "4rem" }}>{categoryEmoji[post.category || ""] || "🌿"}</span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`font-poppins text-xs font-medium px-2.5 py-1 rounded-full ${categoryBg[post.category || ""] || "bg-[#F4EBE2] text-[#6B6B6B]"}`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 font-poppins text-xs text-[#A0A0A0]">
                    <Clock size={11} /> {estimateReadTime(post.content)}
                  </span>
                </div>

                <h3 className="font-cormorant font-bold text-[#2A2A2A] text-xl mb-2 group-hover:text-[#7A2F2F] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="font-poppins text-xs text-[#6B6B6B] leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F4EBE2]">
                  <span className="font-poppins text-xs text-[#A0A0A0]">{formatPostDate(post.created_at)}</span>
                  <span className="flex items-center gap-1 font-poppins text-xs font-medium text-[#7A2F2F] group-hover:gap-2 transition-all">
                    Ler <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
