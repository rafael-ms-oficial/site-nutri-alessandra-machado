"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setLoading(false);
    setSent(true);
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
            Recuperar senha
          </p>
        </div>

        {sent ? (
          <p className="font-poppins text-sm text-[#6B6B6B] text-center">
            Se o email existir, você receberá um link de recuperação em instantes.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-poppins text-sm font-medium text-[#2A2A2A] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#F4EBE2] font-poppins text-sm bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#7A2F2F]/30 focus:border-[#7A2F2F] transition-all"
                placeholder="admin@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#7A2F2F] text-white font-poppins font-medium text-sm hover:bg-[#5c2020] transition-colors disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar link de recuperação"}
            </button>
          </form>
        )}

        <Link
          href="/admin/login"
          className="block text-center font-poppins text-xs text-[#6B6B6B] hover:text-[#7A2F2F] transition-colors mt-6"
        >
          Voltar para o login
        </Link>
      </div>
    </div>
  );
}
