"use client";

import { useEffect, useState, useCallback } from "react";
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

type SvcState = Record<number, { Duracao?: number; Tolerancia?: number }>;

export default function DisponibilidadePage() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);

  // YYYY-MM
  const [month, setMonth] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const [startTime, setStartTime] = useState("09:00");
  const [lunchStart, setLunchStart] = useState("12:30");
  const [lunchEnd, setLunchEnd] = useState("13:30");
  const [endTime, setEndTime] = useState("18:00");
  const [selectedFuncIds, setSelectedFuncIds] = useState<number[]>([]);
  const [servicosState, setServicosState] = useState<SvcState>({});

  /** 1) Fetch serviços e funcionários (setup inicial) */
  const fetchServicosEFuncionarios = useCallback(async () => {
    setLoading(true);
    try {
      const [rServ, rFunc] = await Promise.all([
        fetch("/api/interna/servicos", { credentials: "include" }),
        fetch("/api/interna/funcionarios", { credentials: "include" }),
      ]);
      const sdata = await rServ.json().catch(() => []);
      const fdata = await rFunc.json().catch(() => []);
      setServicos(Array.isArray(sdata) ? sdata : sdata?.servicos ?? []);
      setFuncionarios(Array.isArray(fdata) ? fdata : fdata?.funcionarios ?? []);
    } catch (err) {
      console.error("Erro ao carregar serviços/funcionários:", err);
      toast.error("Erro ao carregar serviços ou funcionários.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 2) Fetch disponibilidade do mês (preenche horas, funcs e Duracao/Tolerancia) */
  const fetchDisponibilidadeMes = useCallback(async (m: string) => {
    try {
      const res = await fetch(`/api/interna/disponibilidade?month=${m}`, { credentials: "include" });
      if (!res.ok) return;
      const body = await res.json().catch(() => null);
      if (!body) return;

      if (body.startTime) setStartTime(body.startTime);
      if (body.lunchStart) setLunchStart(body.lunchStart);
      if (body.lunchEnd) setLunchEnd(body.lunchEnd);
      if (body.endTime) setEndTime(body.endTime);

      setSelectedFuncIds(Array.isArray(body.funcionarios) ? body.funcionarios : []);

      const next: SvcState = {};
      if (Array.isArray(body.servicos)) {
        for (const s of body.servicos) {
          if (s?.Id_Servico) {
            next[s.Id_Servico] = {
              Duracao: s.Duracao ?? undefined,
              Tolerancia: s.Tolerancia ?? undefined,
            };
          }
        }
      }
      setServicosState(next);
    } catch (err) {
      console.error("Erro ao carregar disponibilidade:", err);
    }
  }, []);

  useEffect(() => {
    fetchServicosEFuncionarios();
  }, [fetchServicosEFuncionarios]);

  useEffect(() => {
    fetchDisponibilidadeMes(month);
  }, [month, fetchDisponibilidadeMes]);

  function toggleFuncionario(id: number) {
    setSelectedFuncIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  function setServicoField(id: number, field: "Duracao" | "Tolerancia", value: number | undefined) {
    setServicosState((prev) => ({ ...prev, [id]: { ...(prev[id] ?? {}), [field]: value } }));
  }

  /** HH:mm -> Date (sem sufixo Z para evitar deslocação UTC) */
  const timeToDateLocal = (t: string) => {
    // Mantém a hora “de parede”: evita UTC shift
    return new Date(`1970-01-01T${t}:00`);
  };

  function validate(): string | null {
    if (!month) return "Selecione o mês.";
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

  /** 3) Salvar e RECARREGAR imediatamente o snapshot do mês */
  async function handleSave() {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    const payload = selectedFuncIds.flatMap((funcId) =>
      servicos.map((s) => ({
        Id_Servico: s.Id_Servico,
        Id_Funcionario: funcId,
        Mes: month,
        Ativo: true,
        Inicio: timeToDateLocal(startTime),
        AlmocoInicio: timeToDateLocal(lunchStart),
        AlmocoFim: timeToDateLocal(lunchEnd),
        Fim: timeToDateLocal(endTime),
        Duracao: servicosState[s.Id_Servico]?.Duracao ?? s.Duracao ?? null,
        Tolerancia: servicosState[s.Id_Servico]?.Tolerancia ?? 0,
      }))
    );

    try {
      const res = await fetch("/api/interna/disponibilidade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ disponibilidades: payload }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        console.error("Erro ao salvar disponibilidade:", res.status, txt);
        toast.error(`Erro ao salvar disponibilidade: ${txt || res.status}`);
        return;
      }

      // 3a) Se o backend devolver snapshot, usa-o; senão, faz GET ao mês
      let body: any = null;
      try { body = await res.json(); } catch {}
      toast.success("Disponibilidade salva com sucesso.");

      if (body?.snapshot?.month === month) {
        // Opcional: se implementares no backend retornar { snapshot: { startTime, lunchStart, ... , funcionarios, servicos } }
        const snap = body.snapshot;
        if (snap.startTime) setStartTime(snap.startTime);
        if (snap.lunchStart) setLunchStart(snap.lunchStart);
        if (snap.lunchEnd) setLunchEnd(snap.lunchEnd);
        if (snap.endTime) setEndTime(snap.endTime);
        setSelectedFuncIds(Array.isArray(snap.funcionarios) ? snap.funcionarios : []);
        const next: SvcState = {};
        if (Array.isArray(snap.servicos)) {
          for (const s of snap.servicos) {
            if (s?.Id_Servico) {
              next[s.Id_Servico] = {
                Duracao: s.Duracao ?? undefined,
                Tolerancia: s.Tolerancia ?? undefined,
              };
            }
          }
        }
        setServicosState(next);
      } else {
        // 3b) Re-fetch “source of truth” atual
        await Promise.all([
          fetchDisponibilidadeMes(month),
          fetchServicosEFuncionarios(), // se a lista de funcionários ativos mudar após salvar
        ]);
      }
    } catch (err) {
      console.error("Erro ao salvar disponibilidade:", err);
      toast.error("Erro ao salvar disponibilidade.");
    }
  }

  // Exemplo: calcular slots disponíveis (não modifica arquivos)
  type DisponRow = {
    Id_Servico: number;
    Id_Funcionario: number;
    Mes: string; // "YYYY-MM"
    Inicio: string | Date; // "HH:MM:SS" ou Date
    AlmocoInicio: string | Date;
    AlmocoFim: string | Date;
    Fim: string | Date;
    Duracao: number | null; // minutos
    Tolerancia: number | null; // minutos
    Ativo?: boolean;
  };

  type Agendamento = { Data: string; HoraInicio: string; HoraFinal: string }; // ajustar conforme API

  function timeToMinutes(t: string) {
    const [hh, mm] = t.split(":").map(Number);
    return hh * 60 + mm;
  }
  function minutesToTime(m: number) {
    const hh = Math.floor(m / 60).toString().padStart(2, "0");
    const mm = (m % 60).toString().padStart(2, "0");
    return `${hh}:${mm}`;
  }

  // disponibilidades: rows do banco filtradas por Id_Funcionario+Id_Servico+Mes
  // agendamentos: lista de agendamentos do funcionário no mês (Data + HoraInicio/HoraFinal)
  function computeSlotsForMonth(disponibilidades: DisponRow[], agendamentos: Agendamento[], month: string) {
    // mapa por dia string "YYYY-MM-DD" -> list slots
    const slotsByDay: Record<string, { start: string; end: string }[]> = {};
    // converte agendamentos para ranges em minutos por dia
    const agByDay: Record<string, { startMin: number; endMin: number }[]> = {};
    for (const a of agendamentos) {
      const day = a.Data; // assumir "YYYY-MM-DD"
      const s = timeToMinutes(a.HoraInicio.slice(0,5));
      const e = timeToMinutes(a.HoraFinal.slice(0,5));
      agByDay[day] = agByDay[day] ?? [];
      agByDay[day].push({ startMin: s, endMin: e });
    }

    // Escolhe uma disponibilidade padrão (ou varie por day se tiver multiple rows)
    // Aqui assumimos uma row por Id_Servico+Id_Funcionario+Mes; se houver várias, itere sobre elas.
    if (disponibilidades.length === 0) return slotsByDay;

    // Para cada dia do mês
    const [year, mon] = month.split("-").map(Number);
    const daysInMonth = new Date(year, mon, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${month}-${String(d).padStart(2, "0")}`; // "YYYY-MM-DD"
      // escolha disponibilidade (neste exemplo usamos a primeira)
      const row = disponibilidades[0];
      if (!row || !row.Inicio || !row.Fim) continue;
      const inicio = typeof row.Inicio === "string" ? row.Inicio.slice(0,5) : new Date(row.Inicio).toTimeString().slice(0,5);
      const almIni = typeof row.AlmocoInicio === "string" ? row.AlmocoInicio.slice(0,5) : new Date(row.AlmocoInicio).toTimeString().slice(0,5);
      const almFim = typeof row.AlmocoFim === "string" ? row.AlmocoFim.slice(0,5) : new Date(row.AlmocoFim).toTimeString().slice(0,5);
      const fim = typeof row.Fim === "string" ? row.Fim.slice(0,5) : new Date(row.Fim).toTimeString().slice(0,5);
      const dur = (row.Duracao ?? 30);
      const tol = (row.Tolerancia ?? 0);
      const step = dur + tol;

      const windows = [
        { s: timeToMinutes(inicio), e: timeToMinutes(almIni) },
        { s: timeToMinutes(almFim), e: timeToMinutes(fim) },
      ];

      const dayAg = agByDay[dateStr] ?? [];
      const slots: { start: string; end: string }[] = [];
      for (const w of windows) {
        // gera slots alinhados à start da janela
        for (let startMin = w.s; startMin + dur <= w.e; startMin += step) {
          const endMin = startMin + dur;
          // checar colisão com agendamentos
          const collision = dayAg.some(a => !(endMin <= a.startMin || startMin >= a.endMin));
          if (!collision) {
            slots.push({ start: minutesToTime(startMin), end: minutesToTime(endMin) });
          }
        }
      }
      slotsByDay[dateStr] = slots;
    }

    return slotsByDay; // chave: "YYYY-MM-DD" -> lista de slots
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
                Guardar Disponibilidade
              </Button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="font-semibold mb-3">Horários do dia</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm">Início</label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm">Almoço início</label>
                <input type="time" value={lunchStart} onChange={(e) => setLunchStart(e.target.value)} className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm">Almoço fim</label>
                <input type="time" value={lunchEnd} onChange={(e) => setLunchEnd(e.target.value)} className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm">Fim</label>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full border rounded p-2" />
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
                <div key={s.Id_Servico} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center border rounded p-3">
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
                      onChange={(e) => setServicoField(s.Id_Servico, "Duracao", e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Tolerância (min)</label>
                    <input
                      type="number"
                      min={0}
                      value={servicosState[s.Id_Servico]?.Tolerancia ?? 0}
                      onChange={(e) => setServicoField(s.Id_Servico, "Tolerancia", e.target.value ? Number(e.target.value) : 0)}
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
