"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Lead } from "@/types";
import { CheckCircle, Circle, LogOut, ArrowLeft, MessageCircle, Settings } from "lucide-react";
import { buildLeadWhatsAppLink } from "@/lib/contact";

export default function AdminLeads() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  const supabase = createClient();

  const loadLeads = useCallback(async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
      } else {
        setUser(data.user);
        loadLeads();
      }
    }

    void checkUser();
  }, [router, supabase.auth, loadLeads]);

  async function toggleContacted(lead: Lead) {
    await supabase
      .from("leads")
      .update({ contacted: !lead.contacted })
      .eq("id", lead.id);
    loadLeads();
  }

  async function handleReplyWhatsApp(lead: Lead) {
    window.open(buildLeadWhatsAppLink(lead.name, lead.phone), "_blank", "noopener,noreferrer");
    if (!lead.contacted) {
      await supabase.from("leads").update({ contacted: true }).eq("id", lead.id);
      loadLeads();
    }
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
          <Link
            href="/admin/settings"
            className="flex items-center gap-1.5 font-poppins text-sm text-[#6B6B6B] hover:text-[#7A2F2F] transition-colors"
          >
            <Settings size={16} /> Configurações
          </Link>
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
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-poppins text-xs text-[#6B6B6B] hover:text-[#7A2F2F] transition-colors mb-2"
            >
              <ArrowLeft size={14} /> Posts do Blog
            </Link>
            <h1 className="font-cormorant font-bold text-3xl text-[#7A2F2F]">Leads do Quiz</h1>
            <p className="font-poppins text-sm text-[#6B6B6B] mt-1">{leads.length} lead(s)</p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total", value: leads.length },
            { label: "Contatados", value: leads.filter((l) => l.contacted).length },
            { label: "Pendentes", value: leads.filter((l) => !l.contacted).length },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(122,47,47,0.06)]">
              <p className="font-poppins text-xs text-[#6B6B6B] uppercase tracking-wide">{s.label}</p>
              <p className="font-cormorant font-bold text-3xl text-[#7A2F2F] mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Leads table */}
        <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(122,47,47,0.08)] overflow-hidden">
          {leads.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-cormorant text-2xl text-[#7A2F2F] mb-2">Nenhum lead ainda</p>
              <p className="font-poppins text-sm text-[#6B6B6B]">
                Assim que alguém completar o quiz, o lead aparece aqui.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-[#FAF7F2] border-b border-[#F4EBE2]">
                <tr>
                  <th className="text-left px-6 py-3 font-poppins text-xs font-medium text-[#6B6B6B] uppercase tracking-wide">
                    Nome
                  </th>
                  <th className="text-left px-6 py-3 font-poppins text-xs font-medium text-[#6B6B6B] uppercase tracking-wide">
                    Contato
                  </th>
                  <th className="text-left px-6 py-3 font-poppins text-xs font-medium text-[#6B6B6B] uppercase tracking-wide hidden md:table-cell">
                    Respostas
                  </th>
                  <th className="text-left px-6 py-3 font-poppins text-xs font-medium text-[#6B6B6B] uppercase tracking-wide hidden sm:table-cell">
                    Data
                  </th>
                  <th className="text-right px-6 py-3 font-poppins text-xs font-medium text-[#6B6B6B] uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4EBE2]">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-poppins text-sm font-medium text-[#2A2A2A]">{lead.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-poppins text-sm text-[#6B6B6B]">{lead.phone}</p>
                      {lead.email && (
                        <p className="font-poppins text-xs text-[#A0A0A0]">{lead.email}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell max-w-xs">
                      <p className="font-poppins text-xs text-[#6B6B6B] line-clamp-2">
                        {lead.answers?.join(" · ") || "—"}
                      </p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="font-poppins text-xs text-[#6B6B6B]">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleReplyWhatsApp(lead)}
                          title="Responder no WhatsApp"
                          className="inline-flex items-center gap-1.5 font-poppins text-xs font-medium px-2.5 py-1 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 transition-colors"
                        >
                          <MessageCircle size={14} /> Responder
                        </button>
                        <button
                          onClick={() => toggleContacted(lead)}
                          className={`inline-flex items-center gap-1.5 font-poppins text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                            lead.contacted
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          }`}
                        >
                          {lead.contacted ? <CheckCircle size={14} /> : <Circle size={14} />}
                          {lead.contacted ? "Contatado" : "Pendente"}
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
