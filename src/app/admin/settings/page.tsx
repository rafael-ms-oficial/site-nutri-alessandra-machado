"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, LogOut } from "lucide-react";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.replace("/admin/login");
      else setUser(data.user);
    }
    void checkUser();
  }, [router, supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setMessage("");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError("Não foi possível trocar a senha: " + error.message);
    } else {
      setMessage("Senha atualizada com sucesso!");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
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

      <main className="max-w-md mx-auto px-6 py-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 font-poppins text-xs text-[#6B6B6B] hover:text-[#7A2F2F] transition-colors mb-4"
        >
          <ArrowLeft size={14} /> Voltar
        </Link>

        <h1 className="font-cormorant font-bold text-3xl text-[#7A2F2F] mb-6">Trocar senha</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(122,47,47,0.08)] p-6 space-y-4"
        >
          <div>
            <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
              Nova senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-[#F4EBE2] bg-[#FAF7F2] font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 focus:border-[#7A2F2F] transition-all"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
              Confirmar nova senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-[#F4EBE2] bg-[#FAF7F2] font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 focus:border-[#7A2F2F] transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="font-poppins text-xs text-red-500">{error}</p>}
          {message && <p className="font-poppins text-xs text-green-600">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#7A2F2F] text-white font-poppins font-medium text-sm hover:bg-[#5c2020] transition-colors disabled:opacity-60"
          >
            {loading ? "Salvando..." : "Salvar nova senha"}
          </button>
        </form>
      </main>
    </div>
  );
}
