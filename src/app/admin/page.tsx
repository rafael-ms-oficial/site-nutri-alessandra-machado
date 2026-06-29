"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Post } from "@/types";
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  const supabase = createClient();

  const loadPosts = useCallback(async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
      } else {
        setUser(data.user);
        loadPosts();
      }
    }

    void checkUser();
  }, [router, supabase.auth, loadPosts]);

  async function togglePublish(post: Post) {
    await supabase
      .from("posts")
      .update({ published: !post.published })
      .eq("id", post.id);
    loadPosts();
  }

  async function deletePost(id: string) {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    loadPosts();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="w-8 h-8 border-2 border-[#7A2F2F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Topbar */}
      <header className="bg-white border-b border-[#F4EBE2] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-cormorant font-bold text-2xl text-[#7A2F2F]">AM</span>
          <span className="font-poppins text-sm text-[#6B6B6B]">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-poppins text-xs text-[#6B6B6B]">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 font-poppins text-sm text-[#6B6B6B] hover:text-[#7A2F2F] transition-colors"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-cormorant font-bold text-3xl text-[#7A2F2F]">Posts do Blog</h1>
            <p className="font-poppins text-sm text-[#6B6B6B] mt-1">{posts.length} artigo(s)</p>
          </div>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 bg-[#7A2F2F] text-white font-poppins text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#5c2020] transition-colors"
          >
            <Plus size={16} /> Novo post
          </Link>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: posts.length },
            { label: "Publicados", value: posts.filter((p) => p.published).length },
            { label: "Rascunhos", value: posts.filter((p) => !p.published).length },
            { label: "Categorias", value: new Set(posts.map((p) => p.category)).size },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(122,47,47,0.06)]">
              <p className="font-poppins text-xs text-[#6B6B6B] uppercase tracking-wide">{s.label}</p>
              <p className="font-cormorant font-bold text-3xl text-[#7A2F2F] mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Posts table */}
        <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(122,47,47,0.08)] overflow-hidden">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-cormorant text-2xl text-[#7A2F2F] mb-2">Nenhum post ainda</p>
              <p className="font-poppins text-sm text-[#6B6B6B]">Crie seu primeiro artigo.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-[#FAF7F2] border-b border-[#F4EBE2]">
                <tr>
                  <th className="text-left px-6 py-3 font-poppins text-xs font-medium text-[#6B6B6B] uppercase tracking-wide">
                    Título
                  </th>
                  <th className="text-left px-6 py-3 font-poppins text-xs font-medium text-[#6B6B6B] uppercase tracking-wide hidden md:table-cell">
                    Categoria
                  </th>
                  <th className="text-left px-6 py-3 font-poppins text-xs font-medium text-[#6B6B6B] uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-right px-6 py-3 font-poppins text-xs font-medium text-[#6B6B6B] uppercase tracking-wide">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4EBE2]">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-poppins text-sm font-medium text-[#2A2A2A] line-clamp-1">
                        {post.title}
                      </p>
                      <p className="font-poppins text-xs text-[#A0A0A0] mt-0.5">
                        /{post.slug}
                      </p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="font-poppins text-xs text-[#6B6B6B] bg-[#F4EBE2] px-2.5 py-1 rounded-full">
                        {post.category || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-poppins text-xs font-medium px-2.5 py-1 rounded-full ${
                          post.published
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {post.published ? "Publicado" : "Rascunho"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublish(post)}
                          title={post.published ? "Despublicar" : "Publicar"}
                          className="p-1.5 rounded-lg hover:bg-[#F4EBE2] text-[#6B6B6B] hover:text-[#7A2F2F] transition-colors"
                        >
                          {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="p-1.5 rounded-lg hover:bg-[#F4EBE2] text-[#6B6B6B] hover:text-[#7A2F2F] transition-colors"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-[#6B6B6B] hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
