"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      if (data.session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError("Não foi possível trocar a senha: " + error.message);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #F4EBE2 0%, #FAF7F2 100%)" }}
    >
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_8px_40px_rgba(122,47,47,0.10)] p-8">
        <div className="text-center mb-8">
          <div className="font-cormorant font-bold text-3xl text-[#7A2F2F] mb-1">AM</div>
          <p className="font-poppins text-xs text-[#6B6B6B] uppercase tracking-widest">
            Nova senha
          </p>
        </div>

        {!ready ? (
          <div className="text-center space-y-4">
            <p className="font-poppins text-sm text-[#6B6B6B]">
              Link de recuperação inválido ou expirado.
            </p>
            <Link
              href="/admin/forgot-password"
              className="inline-block font-poppins text-sm text-[#7A2F2F] hover:underline"
            >
              Solicitar novo link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-4 py-3 rounded-xl border border-[#F4EBE2] font-poppins text-sm bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 focus:border-[#7A2F2F] transition-all"
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
                className="w-full px-4 py-3 rounded-xl border border-[#F4EBE2] font-poppins text-sm bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 focus:border-[#7A2F2F] transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="font-poppins text-xs text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#7A2F2F] text-white font-poppins font-medium text-sm hover:bg-[#5c2020] transition-colors disabled:opacity-60"
            >
              {loading ? "Salvando..." : "Salvar nova senha"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
