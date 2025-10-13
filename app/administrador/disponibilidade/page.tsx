"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sideBar";
import Button from "@/components/ui/button";
import { toast } from "react-toastify";

interface Servico {
  Id_Servico: number;
  Nome: string | null;
  Titulo?: string | null;
  Descricao?: string | null;
  Valor?: number | null;
  Duracao?: number | null;
}

interface Funcionario {
  Id_Funcionario: number;
  Nome: string | null;
  Administrador?: boolean;
}

export default function DisponibilidadePage() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);

  // disponibilidade por mês (YYYY-MM)
  const [month, setMonth] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const [startTime, setStartTime] = useState("09:00");
  const [lunchStart, setLunchStart] = useState("12:30");
  const [lunchEnd, setLunchEnd] = useState("13:30");
  const [endTime, setEndTime] = useState("18:00");

  // profissionais selecionados para o mês
  const [selectedFuncIds, setSelectedFuncIds] = useState<number[]>([]);

  // duracao/tolerancia por serviço (local edit)
  const [servicosState, setServicosState] = useState<Record<number, { Duracao?: number; Tolerancia?: number }>>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [rServ, rFunc] = await Promise.all([
          fetch("/api/interna/servicos"),
          fetch("/api/interna/funcionarios"),
        ]);
        const sdata = await rServ.json().catch(() => []);
        const fdata = await rFunc.json().catch(() => []);
        setServicos(Array.isArray(sdata) ? sdata : sdata?.servicos ?? []);
        setFuncionarios(Array.isArray(fdata) ? fdata : fdata?.funcionarios ?? []);
      } catch (err) {
        console.error("Erro ao carregar dados iniciais:", err);
        toast.error("Erro ao carregar serviços ou funcionários.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // carregar disponibilidade existente ao mudar mês
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/interna/disponibilidade?month=${month}`);
        if (!res.ok) return;
        const body = await res.json().catch(() => null);
        if (!body) return;
        // espera: { startTime, lunchStart, lunchEnd, endTime, funcionarios: [ids], servicos: [{Id_Servico, Duracao, Tolerancia}] }
        if (body.startTime) setStartTime(body.startTime);
        if (body.lunchStart) setLunchStart(body.lunchStart);
        if (body.lunchEnd) setLunchEnd(body.lunchEnd);
        if (body.endTime) setEndTime(body.endTime);
        setSelectedFuncIds(Array.isArray(body.funcionarios) ? body.funcionarios : []);
        const svcState: Record<number, { Duracao?: number; Tolerancia?: number }> = {};
        if (Array.isArray(body.servicos)) {
          for (const s of body.servicos) {
            if (s?.Id_Servico) svcState[s.Id_Servico] = { Duracao: s.Duracao ?? undefined, Tolerancia: s.Tolerancia ?? undefined };
          }
        }
        setServicosState(svcState);
      } catch (err) {
        console.error("Erro ao carregar disponibilidade:", err);
      }
    };
    load();
  }, [month]);

  function toggleFuncionario(id: number) {
    setSelectedFuncIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  function setServicoField(id: number, field: "Duracao" | "Tolerancia", value: number | undefined) {
    setServicosState((prev) => ({ ...prev, [id]: { ...(prev[id] ?? {}), [field]: value } }));
  }

  // validações básicas e prevenção de sobreposição lógica
  function validate(): string | null {
    if (!month) return "Selecione o mês.";
    // times como HH:MM
    const toMinutes = (t: string) => {
      const [hh, mm] = t.split(":").map(Number);
      return hh * 60 + mm;
    };
    const s = toMinutes(startTime);
    const ls = toMinutes(lunchStart);
    const le = toMinutes(lunchEnd);
    const e = toMinutes(endTime);
    if (s >= ls) return "Hora de início deve ser anterior ao início do almoço.";
    if (ls >= le) return "Início do almoço deve ser anterior ao fim do almoço.";
    if (le >= e) return "Fim do almoço deve ser anterior ao horário final.";
    // verificar duração de serviços não negativa e menor que total dia útil
    const dayMinutes = e - s - (le - ls);
    for (const sObj of servicos) {
      const st = servicosState[sObj.Id_Servico]?.Duracao;
      const tol = servicosState[sObj.Id_Servico]?.Tolerancia ?? 0;
      if (st != null && (st <= 0 || st > dayMinutes)) {
        return `Duração inválida para serviço "${sObj.Nome}" (${st}).`;
      }
      if (tol < 0) return `Tolerância inválida para serviço "${sObj.Nome}".`;
    }
    if (selectedFuncIds.length === 0) return "Selecione pelo menos um profissional para o mês.";
    return null;
  }

  async function handleSave() {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    const payload = {
      month,
      startTime,
      lunchStart,
      lunchEnd,
      endTime,
      funcionarios: selectedFuncIds,
      servicos: servicos.map((s) => ({
        Id_Servico: s.Id_Servico,
        Duracao: servicosState[s.Id_Servico]?.Duracao ?? s.Duracao ?? null,
        Tolerancia: servicosState[s.Id_Servico]?.Tolerancia ?? 0,
      })),
    };
    try {
      const res = await fetch("/api/interna/disponibilidade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        console.error("Erro ao salvar disponibilidade:", res.status, txt);
        toast.error(`Erro ao salvar disponibilidade: ${txt || res.status}`);
        return;
      }
      toast.success("Disponibilidade salva com sucesso.");
    } catch (err) {
      console.error("Erro ao salvar disponibilidade:", err);
      toast.error("Erro ao salvar disponibilidade.");
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Gestão de Disponibilidade (Administrador)</h1>
            <div className="flex gap-2 items-center">
              <label className="text-sm">Mês</label>
              <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="border rounded p-2" />
              <Button variant="primary" onClick={handleSave}>
                Salvar Disponibilidade
              </Button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="font-semibold mb-3">Horários do dia</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm">Início</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm">Almoço início</label>
                <input
                  type="time"
                  value={lunchStart}
                  onChange={(e) => setLunchStart(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm">Almoço fim</label>
                <input
                  type="time"
                  value={lunchEnd}
                  onChange={(e) => setLunchEnd(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm">Fim</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="font-semibold mb-3">Profissionais disponíveis no mês</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {loading ? (
                <p>Carregando profissionais...</p>
              ) : (
                funcionarios.map((f) => (
                  <label key={f.Id_Funcionario} className="flex items-center gap-2 border p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedFuncIds.includes(f.Id_Funcionario)}
                      onChange={() => toggleFuncionario(f.Id_Funcionario)}
                    />
                    <span>{f.Nome ?? `#${f.Id_Funcionario}`}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="font-semibold mb-3">Duração e Tolerância por Serviço</h2>
            <div className="space-y-3">
              {servicos.map((s) => (
                <div
                  key={s.Id_Servico}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center border rounded p-3"
                >
                  <div className="md:col-span-2">
                    <div className="font-medium">{s.Nome}</div>
                    <div className="text-sm text-gray-600">{s.Titulo ?? s.Descricao}</div>
                  </div>
                  <div>
                    <label className="block text-sm">Duração (min)</label>
                    <input
                      type="number"
                      min={1}
                      value={servicosState[s.Id_Servico]?.Duracao ?? s.Duracao ?? ""}
                      onChange={(e) =>
                        setServicoField(s.Id_Servico, "Duracao", e.target.value ? Number(e.target.value) : undefined)
                      }
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Tolerância (min)</label>
                    <input
                      type="number"
                      min={0}
                      value={servicosState[s.Id_Servico]?.Tolerancia ?? 0}
                      onChange={(e) =>
                        setServicoField(s.Id_Servico, "Tolerancia", e.target.value ? Number(e.target.value) : 0)
                      }
                      className="w-full border rounded p-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
          <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
