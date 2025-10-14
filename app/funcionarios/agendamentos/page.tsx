'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from '@/components/sideBar';
import Button from '@/components/ui/button';
import AgendamentoModal from '@/components/agendamentoModal'; // adicionado
import { toast } from 'react-toastify';

interface Agendamento {
  Id_Agendamento: number;
  Data: string | null;
  HoraInicio: string | null;
  HoraFinal: string | null;
  Status: string | null;
  Observacoes?: string | null;
  servicos: {
    Id_Servico: number;
    Nome: string | null;
    Titulo?: string | null;
    Descricao?: string | null;
    Duracao?: number | null;
    Valor?: number | null;
    Id_Produto?: number | null;
  } | null;
  clientes: {
    Id_Cliente: number;
    Nome: string | null;
    Email?: string | null;
    Telemovel?: string | null;
    DataNascimento?: string | null;
    Morada?: string | null;
    Nif?: number | null;
  } | null;
}

export default function AgendamentosFuncionario() {
  const { data: session } = useSession();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [editAgendamento, setEditAgendamento] = useState<Agendamento | null>(null);
  const [statusEdit, setStatusEdit] = useState<string>('');

  // calendário modal
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Agendamento modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState<Array<{ Id_Cliente: number; Nome?: string; Email?: string }>>([]);
  const [loadingClients, setLoadingClients] = useState(false);

  // separador de tabs: todos / confirmados / cancelados
  const [activeTab, setActiveTab] = useState<'todos' | 'confirmados' | 'cancelados'>('todos');

  // lista mostrada conforme tab
  const filteredAgendamentos = agendamentos.filter((a) => {
    if (activeTab === 'confirmados') return (a.Status ?? '').toLowerCase() === 'confirmado';
    if (activeTab === 'cancelados') return (a.Status ?? '').toLowerCase() === 'cancelado';
    return true;
  });

  // Formata Data ISO/Date para "dd/MM/yyyy" (pt-PT)
  function formatDateISO(dateStr?: string | null) {
    if (!dateStr) return '-';
    try {
      // Se já estiver no formato "dd/MM/yyyy", retornar como está
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
        return dateStr;
      }
      
      // Se for ISO string ou outro formato, converter
      const d = new Date(dateStr);
      if (Number.isNaN(d.getTime())) return dateStr; // fallback para string original
      return d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dateStr || '-'; // fallback para string original ou traço
    }
  }

  // Formata hora para "HH:mm"
  function formatTime(timeStr?: string | null) {
    if (!timeStr) return '-';
    try {
      // Se já estiver no formato "HH:mm" ou "HH:mm:ss"
      if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(timeStr)) {
        // normalizar para 2 dígitos e minutos
        const parts = timeStr.split(':');
        const hh = parts[0].padStart(2, '0');
        const mm = parts[1].padStart(2, '0');
        return `${hh}:${mm}`;
      }

      // Se for um ISO datetime, parse e formatar
      const d = new Date(timeStr);
      if (!Number.isNaN(d.getTime())) {
        return d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
      }

      // fallback: mostrar original se não conseguir processar
      return String(timeStr).trim() || '-';
    } catch {
      return String(timeStr) || '-';
    }
  }
  
  // Buscar agendamentos do funcionário logado
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchAgendamentos = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/interna/funcionarios/agendamentos');
        const lista = await res.json().catch(() => []);
        setAgendamentos(Array.isArray(lista) ? lista : []);
      } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, [session?.user?.email]);

  // Atualizar status
  const handleStatusUpdate = async (Id_Agendamento: number, Status: string) => {
    try {
      const res = await fetch(`/api/interna/funcionarios/agendamentos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Id_Agendamento, Status }),
      });

      if (!res.ok) {
        throw new Error('Erro ao atualizar agendamento');
      }

      setAgendamentos((prev) =>
        prev.map((a) =>
          a.Id_Agendamento === Id_Agendamento ? { ...a, Status } : a
        )
      );
    } catch (err) {
      console.error('Erro ao atualizar status do agendamento:', err);
    } finally {
      setEditAgendamento(null);
      setStatusEdit('');
    }
  };

  // Reenviar confirmação
  const handleReenviarConfirmacao = async (Id_Agendamento: number) => {
    try {
      const res = await fetch('/api/interna/agendamentos/confirmacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Id_Agendamento }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.method === 'email') {
          toast.success('Confirmação reenviada via email (WhatsApp indisponível)');
        } else {
          toast.success('Confirmação reenviada via WhatsApp com sucesso!');
        }
      } else {
        toast.error(data.error || 'Erro ao reenviar confirmação');
      }
    } catch (err) {
      console.error('Erro ao reenviar confirmação:', err);
      toast.error('Erro ao reenviar confirmação');
    }
  };

  // helper: normaliza data para key "YYYY-MM-DD"
  function dateKey(dateStr?: string | null) {
    if (!dateStr) return null;
    try {
      // Se já estiver no formato "dd/MM/yyyy", converter para "YYYY-MM-DD"
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
      
      // Se for ISO string ou outro formato, converter
      return new Date(dateStr).toISOString().split('T')[0];
    } catch {
      return null;
    }
  }

  // Componente interno: CalendarModal (render simples, marca dias com agendamentos)
  function CalendarModal(props: { open: boolean; onClose: () => void }) {
    if (!props.open) return null;

    const appointmentsByDay = agendamentos.reduce<Record<string, Agendamento[]>>((acc, a) => {
      const k = dateKey(a.Data);
      if (!k) return acc;
      (acc[k] = acc[k] || []).push(a);
      return acc;
    }, {});

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // primeiro dia da semana do mês (0=Dom)
    const startWeekDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<{ day: number | null; key: string | null }> = [];
    for (let i = 0; i < startWeekDay; i++) cells.push({ day: null, key: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const k = new Date(year, month, d).toISOString().split('T')[0];
      cells.push({ day: d, key: k });
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
        <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                className="px-2 py-1 rounded bg-gray-100"
              >
                ◀
              </button>
              <div className="font-medium">{currentMonth.toLocaleString('pt-PT', { month: 'long', year: 'numeric' })}</div>
              <button
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                className="px-2 py-1 rounded bg-gray-100"
              >
                ▶
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setSelectedDay(null); setCalendarOpen(false); }} className="px-3 py-1 bg-gray-200 rounded">Fechar</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-sm">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
              <div key={d} className="text-center font-medium text-gray-600">{d}</div>
            ))}
            {cells.map((c, idx) => {
              const has = c.key && appointmentsByDay[c.key] && appointmentsByDay[c.key].length > 0;
              const isSelected = c.key === selectedDay;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(c.key)}
                  className={`h-16 flex flex-col items-center justify-center rounded ${c.day ? 'hover:bg-gray-50' : ''} ${has ? 'bg-yellow-100' : ''} ${isSelected ? 'ring-2 ring-indigo-400' : ''}`}
                  disabled={!c.day}
                >
                  <div className="text-sm">{c.day ?? ''}</div>
                  {has && <div className="w-2 h-2 rounded-full bg-red-500 mt-1" />}
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Agendamentos{selectedDay ? ` — ${selectedDay}` : ''}</h4>
            {!selectedDay && <div className="text-sm text-gray-500">Selecione um dia para ver os agendamentos.</div>}
            {selectedDay && (appointmentsByDay[selectedDay] ?? []).length === 0 && (
              <div className="text-sm text-gray-500">Nenhum agendamento neste dia.</div>
            )}
            {selectedDay && (appointmentsByDay[selectedDay] ?? []).map((ap) => (
              <div key={ap.Id_Agendamento} className="p-2 border rounded mb-2">
                <div className="font-medium">{ap.servicos?.Nome ?? '—'}</div>
                <div className="text-sm text-gray-600">{ap.clientes?.Nome ?? '—'} — {formatTime(ap.HoraInicio)} - {formatTime(ap.HoraFinal)}</div>
                <div className="text-sm text-gray-500">Status: {ap.Status ?? '—'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // fetch clientes para o modal
  async function fetchClients() {
    setLoadingClients(true);
    try {
      const res = await fetch('/api/interna/funcionarios/clientes');
      if (!res.ok) {
        console.error('Erro ao carregar clientes (status != 200):', res.status);
        setClients([]);
        return;
      }
      const data = await res.json().catch(() => null);
      const list = Array.isArray(data) ? data : Array.isArray(data?.clientes) ? data.clientes : [];
      setClients(list);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setClients([]);
    } finally {
      setLoadingClients(false);
    }
  }

  // abrir modal para novo agendamento (carrega clientes antes)
  const openNovoAgendamento = async () => {
    await fetchClients();
    setIsModalOpen(true);
  };

  // handler que o modal chamará com os dados do novo agendamento
  const handleAgendamentoCriado = async (dados: {
    Data: string;
    HoraInicio: string;
    HoraFinal: string;
    Id_Servico: number;
    Id_Funcionario?: number | null;
    Id_Cliente?: number | null;
    Observacoes?: string;
  }) => {
    try {
      // tentar rota específica de funcionários (evita 404 se rota estiver lá)
      const url = '/api/interna/funcionarios/agendamentos';
      const res = await fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(dados),
       });
      if (!res.ok) {
        // tenta ler texto/json do corpo para mostrar motivo
        const txt = await res.text().catch(() => null);
        throw new Error(txt || `Erro ao criar agendamento (status ${res.status})`);
      }
      // atualizar lista local
      await (async () => {
        setLoading(true);
        try {
          const r = await fetch('/api/interna/funcionarios/agendamentos');
          const lista = await r.json().catch(() => []);
          setAgendamentos(Array.isArray(lista) ? lista : []);
        } finally {
          setLoading(false);
        }
      })();
      setIsModalOpen(false);
      toast.success('Agendamento criado com sucesso.');
    } catch (err) {
      console.error(err);
      toast.error(String((err as Error).message || 'Erro ao criar agendamento.'));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Meus Agendamentos</h1>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setCalendarOpen(true)}>
              Ver Calendário
            </Button>
            <Button variant="primary" onClick={openNovoAgendamento}>
              Novo Agendamento
            </Button>
          </div>
        </div>

        {/* Tabs: Todos / Confirmados / Cancelados */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-3 py-1 rounded ${activeTab === 'todos' ? 'bg-black text-white' : 'bg-gray-100'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab('confirmados')}
            className={`px-3 py-1 rounded ${activeTab === 'confirmados' ? 'bg-black text-white' : 'bg-gray-100'}`}
          >
            Confirmados
          </button>
          <button
            onClick={() => setActiveTab('cancelados')}
            className={`px-3 py-1 rounded ${activeTab === 'cancelados' ? 'bg-black text-white' : 'bg-gray-100'}`}
          >
            Cancelados
          </button>
          <div className="text-sm text-gray-500 ml-4">Total: {filteredAgendamentos.length}</div>
        </div>

        {/* Calendar modal */}
        <CalendarModal open={calendarOpen} onClose={() => setCalendarOpen(false)} />

        {/* Agendamento modal (novo/agendar) */}
        <AgendamentoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAgendamentoCriado={handleAgendamentoCriado}
          isEditing={false}
          initialData={null}
          clientes={clients}
          loadingClientes={loadingClients}
          madeByFuncionario={true}
        />

        {loading ? (
          <div>Carregando...</div>
        ) : filteredAgendamentos.length === 0 ? (
          <div className="text-gray-500">Nenhum agendamento encontrado para esta categoria.</div>
        ) : (
          <div>
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Cliente</th>
                  <th className="p-2">Serviço</th>
                  <th className="p-2">Data</th>
                  <th className="p-2">Hora Início</th>
                  <th className="p-2">Hora Final</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgendamentos.map((a) => (
                  <tr key={a.Id_Agendamento} className="border-t">
                    <td className="p-2">{a.clientes?.Nome || '-'}</td>
                    <td className="p-2">{a.servicos?.Nome || '-'}</td>
                    <td className="p-2">{formatDateISO(a.Data)}</td>
                    <td className="p-2">{formatTime(a.HoraInicio)}</td>
                    <td className="p-2">{formatTime(a.HoraFinal)}</td>
                    <td className="p-2">
                      {editAgendamento?.Id_Agendamento === a.Id_Agendamento ? (
                        <select
                          value={statusEdit}
                          onChange={(e) => setStatusEdit(e.target.value)}
                          className="border rounded px-2 py-1"
                        >
                          <option value="">Selecione</option>
                          <option value="Realizado">Realizado</option>
                          <option value="Confirmado">Confirmado</option>
                          <option value="Cancelado">Cancelado</option>
                          <option value="Marcado">Marcado</option>
                        </select>
                      ) : (
                        a.Status || '-'
                      )}
                    </td>
                    <td className="p-2 text-left">
                      {editAgendamento?.Id_Agendamento === a.Id_Agendamento ? (
                        <div className="flex gap-2">
                          <Button
                            variant="primary"
                            onClick={() =>
                              handleStatusUpdate(a.Id_Agendamento, statusEdit)
                            }
                            disabled={!statusEdit}
                          >
                            Guardar
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setEditAgendamento(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setEditAgendamento(a);
                              setStatusEdit(a.Status || '');
                            }}
                          >
                            Editar Status
                          </Button>
                          {a.Status === 'Marcado' && (
                            <Button
                              variant="primary"
                              onClick={() => handleReenviarConfirmacao(a.Id_Agendamento)}
                            >
                              📱 Confirmar
                            </Button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
