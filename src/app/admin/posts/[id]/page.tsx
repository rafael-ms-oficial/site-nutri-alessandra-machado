"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Save, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

const categories = ["Emagrecimento", "Saúde Intestinal", "Comportamento Alimentar", "Nutrição"];

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function PostEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    published: false,
    cover_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadError, setUploadError] = useState("");

  const supabase = createClient();

  const loadPost = useCallback(async () => {
    if (isNew) return;
    const { data } = await supabase.from("posts").select("*").eq("id", id).single();
    if (data) {
      setForm({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || "",
        content: data.content || "",
        category: data.category || "",
        published: data.published,
        cover_url: data.cover_url || "",
      });
    }
  }, [id, isNew, supabase]);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) router.replace("/admin/login");
      else loadPost();
    }

    void checkUser();
  }, [router, supabase.auth, loadPost]);

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: isNew ? slugify(title) : f.slug,
    }));
  }

  async function handleSave() {
    if (!form.title || !form.slug) {
      setMessage("Título e slug são obrigatórios.");
      return;
    }
    setSaving(true);
    setMessage("");

    const payload = { ...form };

    if (isNew) {
      const { error } = await supabase.from("posts").insert(payload);
      if (error) setMessage("Erro ao criar post: " + error.message);
      else {
        setMessage("Post criado com sucesso!");
        setTimeout(() => router.push("/admin"), 1200);
      }
    } else {
      const { error } = await supabase
        .from("posts")
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) setMessage("Erro ao salvar: " + error.message);
      else setMessage("Salvo com sucesso!");
    }

    setSaving(false);
  }

  async function uploadImage(file: File): Promise<string | null> {
    setUploading(true);
    setUploadError("");

    const rawExt = file.name.split(".").pop();
    const ext = rawExt && /^[a-zA-Z0-9]+$/.test(rawExt) ? rawExt.toLowerCase() : "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage.from("posts").upload(path, file);
    setUploading(false);

    if (error) {
      setUploadError("Erro ao enviar imagem: " + error.message);
      return null;
    }

    const { data } = supabase.storage.from("posts").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleCoverImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const previousUrl = form.cover_url;
    const url = await uploadImage(file);
    if (!url) return;

    setForm((f) => ({ ...f, cover_url: url }));

    if (previousUrl.includes("/storage/v1/object/public/posts/")) {
      const oldPath = previousUrl.split("/storage/v1/object/public/posts/")[1];
      if (oldPath) void supabase.storage.from("posts").remove([oldPath]);
    }
  }

  async function handleEditorImageUpload(): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        const file = input.files?.[0];
        resolve(file ? await uploadImage(file) : null);
      };
      input.click();
    });
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Topbar */}
      <header className="bg-white border-b border-[#F4EBE2] px-6 py-4 flex items-center justify-between">
        <Link
          href="/admin"
          className="flex items-center gap-2 font-poppins text-sm text-[#6B6B6B] hover:text-[#7A2F2F] transition-colors"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>
        <div className="flex items-center gap-3">
          {message && (
            <span className="font-poppins text-xs text-green-600">{message}</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || uploading}
            className="inline-flex items-center gap-2 bg-[#7A2F2F] text-white font-poppins text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#5c2020] disabled:opacity-60 transition-colors"
          >
            <Save size={16} />
            {uploading ? "Enviando imagem..." : saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <h1 className="font-cormorant font-bold text-3xl text-[#7A2F2F]">
          {isNew ? "Novo Post" : "Editar Post"}
        </h1>

        {/* Title */}
        <div>
          <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
            Título *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Título do artigo"
            className="w-full px-4 py-3 rounded-xl border border-[#F4EBE2] bg-white font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 focus:border-[#7A2F2F] transition-all"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
            Slug (URL) *
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="titulo-do-artigo"
            className="w-full px-4 py-3 rounded-xl border border-[#F4EBE2] bg-white font-poppins text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 focus:border-[#7A2F2F] transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
              Categoria
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#F4EBE2] bg-white font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 focus:border-[#7A2F2F] transition-all"
            >
              <option value="">Selecione...</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Published */}
          <div>
            <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
              Status
            </label>
            <button
              type="button"
              onClick={() => setForm({ ...form, published: !form.published })}
              className={`w-full px-4 py-3 rounded-xl border font-poppins text-sm font-medium transition-all ${
                form.published
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-amber-50 border-amber-200 text-amber-700"
              }`}
            >
              {form.published ? "✓ Publicado" : "○ Rascunho"}
            </button>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
            Resumo
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={4}
            placeholder="Breve descrição para listagens e SEO"
            className="w-full px-4 py-3 rounded-xl border border-[#F4EBE2] bg-white font-poppins text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 focus:border-[#7A2F2F] transition-all"
          />
        </div>

        {/* Cover image */}
        <div>
          <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
            Imagem de capa
          </label>
          {form.cover_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.cover_url}
              alt="Prévia da imagem de capa"
              className="w-full max-h-56 object-cover rounded-xl border border-[#F4EBE2] mb-3"
            />
          )}
          <div className="flex gap-3">
            <input
              type="text"
              value={form.cover_url}
              onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
              placeholder="URL da imagem ou faça upload"
              className="flex-1 px-4 py-3 rounded-xl border border-[#F4EBE2] bg-white font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 focus:border-[#7A2F2F] transition-all"
            />
            <label className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-[#F4EBE2] bg-white font-poppins text-sm text-[#6B6B6B] hover:border-[#7A2F2F] cursor-pointer transition-all">
              <Upload size={16} /> {uploading ? "Enviando..." : "Upload"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={handleCoverImageUpload}
              />
            </label>
          </div>
          {uploadError && (
            <p className="font-poppins text-xs text-red-500 mt-1.5">{uploadError}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
            Conteúdo
          </label>
          <RichTextEditor
            value={form.content}
            onChange={(html) => setForm((f) => ({ ...f, content: html }))}
            onRequestImageUpload={handleEditorImageUpload}
          />
        </div>
      </main>
    </div>
  );
}
