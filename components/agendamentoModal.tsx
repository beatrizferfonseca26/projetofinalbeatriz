'use client';

import { debounce } from 'lodash';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { format, addMinutes, parse, isBefore, isAfter, add, differenceInMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import Button from './ui/button';
import { endOfMonth, eachDayOfInterval, format as f } from 'date-fns';

/* ===================== Helpers de tipo/validação ===================== */

function isValidYmd(s: unknown): s is string {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
}
function isValidYm(s: unknown): s is string {
  return typeof s === 'string' && /^\d{4}-\d{2}$/.test(s);
}
function hasDailyDate(d: Disponibilidade): d is Disponibilidade & { Data: string } {
  return isValidYmd(d.Data);
}

/** Converte disponibilidade mensal (Mes + DiaSemana) em entradas diárias (Data) */
function expandMonthlyToDaily(rows: Disponibilidade[]): Disponibilidade[] {
  const out: Disponibilidade[] = [];
  for (const r of rows) {
    // já vem diário? mantém
    if (hasDailyDate(r)) { out.push(r); continue; }

    // se for mensal
    if (isValidYm(r.Mes) && r.DiaSemana && r.Ativo !== false) {
      const [y, m] = r.Mes!.split('-').map(Number);
      const monthStart = new Date(y, m - 1, 1);
      const monthEnd   = endOfMonth(monthStart);
      const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

      for (const d of days) {
        // Em JS, Domingo=0..Sábado=6; se o teu DiaSemana for Seg=1..Dom=7:
        const jsDow = d.getDay();              // 0..6 (0=Dom)
        const dowPT = jsDow === 0 ? 7 : jsDow; // 1..7 (Seg=1)
        if (dowPT !== r.DiaSemana) continue;

        const data = f(d, 'yyyy-MM-dd');
        out.push({ ...r, Data: data, Mes: undefined, DiaSemana: undefined });
      }
    }
  }
  return out;
}

/** Pega a primeira Data >= hoje (respeita minDate do DatePicker) */
function firstAvailableDate(dailies: Disponibilidade[]): Date | null {
  const today = new Date();
  const ordered = Array.from(new Set(dailies.map(d => d.Data).filter(isValidYmd))).sort();
  for (const ymd of ordered) {
    const dt = new Date(ymd + 'T00:00:00');
    if (!isBefore(dt, today)) return dt;
  }
  return null;
}

/* ===================== Tipos ===================== */

type Disponibilidade = {
  Id_Disponibilidade: number;
  // diário
  Data?: string;           // "yyyy-MM-dd"
  HoraInicio: string;      // "HH:mm"
  HoraFinal: string;       // "HH:mm"
  Ativo?: boolean;
  Id_Servico?: number;
  Id_Funcionario?: number | null;
  // mensal (fallback)
  Mes?: string;            // "yyyy-MM"
  DiaSemana?: number;      // 1..7 (Seg=1)
};

type Servico = {
  Id_Servico: number;
  Nome: string;
  Descricao: string;
  Duracao: number; // em minutos
  Valor: number;
  disponibilidadeprod?: Disponibilidade[];
};

type Funcionario = {
  Id_Funcionario: number;
  Nome: string;
};

type Cliente = {
  Id_Cliente: number;
  Nome?: string | null;
  Email?: string | null;
};

type AgendamentoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAgendamentoCriado: (dados: {
    Data: string;
    HoraInicio: string;
    HoraFinal: string;
    Id_Servico: number;
    Id_Funcionario?: number | null;
    Id_Cliente?: number | null;
    Observacoes?: string;
  }) => void | Promise<void>;
  isEditing?: boolean;
  initialData?: {
    Id_Agendamento?: number;
    Data?: string;
    HoraInicio?: string;
    HoraFinal?: string;
    Id_Servico?: number;
    Id_Funcionario?: number | null;
    Id_Cliente?: number | null;
    Observacoes?: string | null;
  } | null;
  onEditSaved?: (dados: any) => void | Promise<void>;
  clientes?: Cliente[];
  loadingClientes?: boolean;
  madeByFuncionario?: boolean;
};

/* ===================== Componente ===================== */

export default function AgendamentoModal({
  isOpen,
  onClose,
  onAgendamentoCriado,
  isEditing = false,
  initialData = null,
  onEditSaved,
  clientes,
  loadingClientes = false,
  madeByFuncionario = false,
}: AgendamentoModalProps) {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [selectedServico, setSelectedServico] = useState<number | null>(null);
  const [selectedFuncionario, setSelectedFuncionario] = useState<number | null>(null);

  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarios, setHorarios] = useState<string[]>([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);

  const [selectedCliente, setSelectedCliente] = useState<number | null>(null);
  const [internalClientes, setInternalClientes] = useState<Cliente[]>([]);
  const [internalLoadingClientes, setInternalLoadingClientes] = useState(false);

  const [agendando, setAgendando] = useState(false);
  const [modalidadePagamento, setModalidadePagamento] = useState<'Online' | 'Presencial'>('Online');
  const [observacoes, setObservacoes] = useState<string>('');

  // Disponibilidades ATIVAS do serviço (e opcionalmente do funcionário)
  const [disponAtivas, setDisponAtivas] = useState<Disponibilidade[]>([]);

  /* ====== Prefill de edição ====== */
  useEffect(() => {
    if (!isOpen) return;
    if (isEditing && initialData) {
      if (initialData.Id_Servico) setSelectedServico(initialData.Id_Servico);
      if (initialData.Id_Funcionario) setSelectedFuncionario(initialData.Id_Funcionario);
      if (initialData.Data) setDataSelecionada(new Date(initialData.Data + 'T00:00:00'));
      if (initialData.HoraInicio) setHorarioSelecionado(initialData.HoraInicio);
      if (initialData.Observacoes) setObservacoes(initialData.Observacoes);
      if (initialData.Id_Cliente) setSelectedCliente(initialData.Id_Cliente);
    } else {
      setSelectedServico(null);
      setSelectedFuncionario(null);
      setDataSelecionada(null);
      setHorarios([]);
      setHorarioSelecionado(null);
      setObservacoes('');
      setSelectedCliente(null);
    }
  }, [isOpen, isEditing, initialData]);

  /* ====== Carregar serviços e funcionários base ====== */
  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const [resServ, resFunc] = await Promise.all([
          fetch('/api/interna/servicos/disponibilidade'),
          fetch('/api/interna/funcionarios'),
        ]);

        if (resServ.ok) {
          const data = await resServ.json().catch(() => null);
          setServicos(data?.servicosDisponiveis || []);
        } else {
          toast.error('Erro ao carregar serviços');
        }

        if (resFunc.ok) {
          const dataF = await resFunc.json().catch(() => null);
          const list = Array.isArray(dataF) ? dataF : dataF?.funcionarios ?? [];
          setFuncionarios(list);
        } else {
          toast.error('Erro ao carregar funcionários');
        }
      } catch (e) {
        console.error(e);
        toast.error('Erro ao carregar dados iniciais');
      }
    })();
  }, [isOpen]);

  /* ====== Carregar clientes em modo funcionário ====== */
  useEffect(() => {
    if (!isOpen || !madeByFuncionario) return;
    let mounted = true;
    setInternalLoadingClientes(true);
    (async () => {
      try {
        const res = await fetch('/api/interna/funcionarios/clientes');
        if (!res.ok) throw new Error('Clientes endpoint');
        const data = await res.json().catch(() => null);
        const list = Array.isArray(data) ? data : data?.clientes ?? [];
        if (mounted) setInternalClientes(list);
      } catch (e) {
        console.error(e);
        if (mounted) setInternalClientes([]);
        toast.error('Erro ao carregar clientes');
      } finally {
        if (mounted) setInternalLoadingClientes(false);
      }
    })();
    return () => { mounted = false; };
  }, [isOpen, madeByFuncionario]);

  /* ====== Buscar disponibilidade ATIVA por serviço/func ====== */
  const fetchDisponibilidadeServico = useCallback(async (idServico: number, idFuncionario?: number | null) => {
    try {
      const url = idFuncionario
        ? `/api/interna/servicos/${idServico}/disponibilidade?funcionarioId=${idFuncionario}`
        : `/api/interna/servicos/${idServico}/disponibilidade`;

      let res = await fetch(url);
      let list: Disponibilidade[] | null = null;

      if (res.ok) {
        const data = await res.json().catch(() => null);
        list = (Array.isArray(data) ? data : data?.disponibilidade) ?? null;
      }

      // Fallback: usar payload geral
      if (!list) {
        const s = servicos.find(x => x.Id_Servico === idServico);
        list = s?.disponibilidadeprod ?? [];
        if (idFuncionario) list = list.filter(d => (d.Id_Funcionario ?? null) === idFuncionario);
      }

      // 1) Expande mensal → diário se necessário
      const expanded = expandMonthlyToDaily(list ?? []);

      // 2) Filtra Ativo + Data válida
      const onlyActive = expanded.filter(d => d.Ativo !== false && hasDailyDate(d));

      setDisponAtivas(onlyActive);

      // 3) AUTO-SELECT do primeiro dia disponível >= hoje
      const firstDate = firstAvailableDate(onlyActive);
      if (firstDate) {
        setDataSelecionada(firstDate);
        // horários vão ser recalculados pelo useEffect existente
      } else {
        setDataSelecionada(null);
        setHorarios([]);
        setHorarioSelecionado(null);
      }
    } catch (e) {
      console.error('Erro ao buscar disponibilidade:', e);
      setDisponAtivas([]);
      setDataSelecionada(null);
      setHorarios([]);
      setHorarioSelecionado(null);
    }
  }, [servicos]);

  /* ====== Recarrega disponibilidade quando troca serviço/funcionário ====== */
  useEffect(() => {
    if (!isOpen || !selectedServico) {
      setDisponAtivas([]);
      return;
    }
    fetchDisponibilidadeServico(selectedServico, selectedFuncionario ?? undefined);
    // resetar escolhas dependentes
    setDataSelecionada(null);
    setHorarios([]);
    setHorarioSelecionado(null);
  }, [isOpen, selectedServico, selectedFuncionario, fetchDisponibilidadeServico]);

  /* ====== Conjunto de dias válidos (disable no calendário) ====== */
  const enabledDatesSet = useMemo(() => {
    const s = new Set<string>();
    for (const d of disponAtivas) {
      if (d.Ativo === false) continue;
      if (hasDailyDate(d)) s.add(d.Data); // yyyy-MM-dd
    }
    return s;
  }, [disponAtivas]);

  // `filterDate` – só aceita dias com disponibilidade ativa
  const filterDate = useCallback((date: Date) => {
    const key = format(date, 'yyyy-MM-dd');
    return enabledDatesSet.has(key);
  }, [enabledDatesSet]);

  /* ====== Geração de slots válidos para o dia escolhido ====== */
  const STEP_MIN = 15; // granularidade

  const buildSlotsForDate = useCallback((date: Date) => {
    const ymd = format(date, 'yyyy-MM-dd');
    const svc = servicos.find(s => s.Id_Servico === selectedServico);
    if (!svc) return [];

    const dur = svc.Duracao ?? 0;
    if (dur <= 0) return [];

    // janelas ativas para esse dia
    const janelas = disponAtivas
      .filter(d => d.Ativo !== false && hasDailyDate(d) && d.Data === ymd)
      .map(d => {
        const start = parse(`${d.Data} ${d.HoraInicio}`, 'yyyy-MM-dd HH:mm', new Date());
        const end   = parse(`${d.Data} ${d.HoraFinal}`,  'yyyy-MM-dd HH:mm', new Date());
        return { start, end };
      })
      // sanity: ignorar janelas invertidas
      .filter(w => isBefore(w.start, w.end));

    const out: string[] = [];
    for (const w of janelas) {
      // o início do slot + duração tem de caber DENTRO da janela
      let cursor = w.start;
      // se a janela for menor que a duração, ignora
      if (differenceInMinutes(w.end, w.start) < dur) continue;

      while (true) {
        const slotEnd = addMinutes(cursor, dur);
        if (isAfter(slotEnd, w.end)) break;
        out.push(format(cursor, 'HH:mm'));
        cursor = add(cursor, { minutes: STEP_MIN });
      }
    }

    // ordena, remove duplicados
    return Array.from(new Set(out)).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }, [disponAtivas, selectedServico, servicos]);

  // Regerar horários quando escolho dia
  useEffect(() => {
    if (!dataSelecionada || !selectedServico) {
      setHorarios([]);
      setHorarioSelecionado(null);
      return;
    }
    const slots = buildSlotsForDate(dataSelecionada);
    setHorarios(slots);
    setHorarioSelecionado(null);
  }, [dataSelecionada, selectedServico, buildSlotsForDate]);

  // Resetar funcionário quando mudar serviço
  useEffect(() => {
    setSelectedFuncionario(null);
  }, [selectedServico]);

  // ====== AGENDAR com validação de slot ======
  const handleAgendar = debounce(async () => {
    if (agendando) return;
    setAgendando(true);

    if (!selectedServico || !dataSelecionada || !horarioSelecionado) {
      toast.error('Preencha todos os campos obrigatórios antes de confirmar.');
      setAgendando(false);
      return;
    }

    // slot tem de existir na lista gerada para o dia
    if (!horarios.includes(horarioSelecionado)) {
      toast.error('Horário indisponível para a data selecionada.');
      setAgendando(false);
      return;
    }

    const servico = servicos.find((s) => s.Id_Servico === selectedServico);
    if (!servico) {
      toast.error('Serviço inválido.');
      setAgendando(false);
      return;
    }

    const inicio = parse(horarioSelecionado, 'HH:mm', dataSelecionada);
    const final = addMinutes(inicio, servico.Duracao);

    if (madeByFuncionario && !selectedCliente) {
      toast.error('Selecione o cliente para este agendamento.');
      setAgendando(false);
      return;
    }

    const dadosBase = {
      Id_Servico: selectedServico,
      Data: format(dataSelecionada, 'yyyy-MM-dd'),
      HoraInicio: format(inicio, 'HH:mm'),
      HoraFinal: format(final, 'HH:mm'),
      Observacoes: observacoes || null,
    };

    const dados = madeByFuncionario
      ? {
        ...dadosBase,
        Id_Cliente: selectedCliente,
        Modalidade: modalidadePagamento,
        Valor: servico.Valor,
      }
      : {
        ...dadosBase,
        Id_Funcionario: selectedFuncionario,
        Id_Cliente: selectedCliente ?? undefined,
        ModalidadePagamento: modalidadePagamento,
      };

    try {
      if (isEditing && initialData && onEditSaved) {
        const payload = {
          Id_Agendamento: initialData.Id_Agendamento,
          Id_Servico: dadosBase.Id_Servico,
          Id_Funcionario: selectedFuncionario,
          Data: dadosBase.Data,
          HoraInicio: dadosBase.HoraInicio,
          Observacoes: dadosBase.Observacoes || null,
        };
        await onEditSaved(payload);
      } else {
        const endpoint = madeByFuncionario
          ? '/api/interna/funcionarios/agendamentos'
          : '/api/interna/agendamentos';

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => null);
          console.error('Erro ao agendar:', res.status, txt);
          toast.error(`Erro ao realizar agendamento: ${txt || res.status}`);
          setAgendando(false);
          return;
        }

        // Obter o agendamento criado para enviar confirmação
        const agendamentoResponse = await res.json();
        const agendamentoId = agendamentoResponse.agendamento?.Id_Agendamento || agendamentoResponse.Id_Agendamento;

        toast.success('Agendamento realizado com sucesso!');

        // Enviar confirmação via WhatsApp/SMS automaticamente
        if (agendamentoId && selectedCliente) {
          try {
            const confirmacaoRes = await fetch('/api/interna/agendamentos/confirmacao', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ Id_Agendamento: agendamentoId }),
            });

            if (confirmacaoRes.ok) {
              const confirmacaoData = await confirmacaoRes.json();
              if (confirmacaoData.success) {
                toast.success('Confirmação enviada via WhatsApp!', { 
                  autoClose: 3000 
                });
              } else if (confirmacaoData.method === 'email') {
                toast.info('Confirmação enviada via email (WhatsApp indisponível)', { 
                  autoClose: 4000 
                });
              }
            } else {
              console.warn('Falha ao enviar confirmação:', await confirmacaoRes.text());
              toast.warn('Agendamento criado, mas confirmação não pôde ser enviada', { 
                autoClose: 4000 
              });
            }
          } catch (confirmacaoError) {
            console.error('Erro ao enviar confirmação:', confirmacaoError);
            toast.warn('Agendamento criado, mas houve erro no envio da confirmação', { 
              autoClose: 4000 
            });
          }
        }
        onAgendamentoCriado({
          Data: dadosBase.Data,
          HoraInicio: dadosBase.HoraInicio,
          HoraFinal: dadosBase.HoraFinal,
          Id_Servico: dadosBase.Id_Servico,
          Id_Funcionario: selectedFuncionario ?? undefined,
          Id_Cliente: selectedCliente ?? undefined,
          Observacoes: dadosBase.Observacoes ?? undefined,
        });
        onClose();
      }
    } catch (err) {
      console.error('Erro inesperado ao agendar:', err);
      toast.error('Erro inesperado ao agendar.');
    } finally {
      setAgendando(false);
    }
  }, 500);

  // ====== Salvamento alternativo (se usares onAgendamentoCriado diretamente) ======
  // Mantive, mas agora o slot já está validado pelo gerador de horários.
  // …

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Agendar Serviço</h2>

        {/* Serviço */}
        <select
          className="w-full border p-2 mb-4 rounded"
          value={selectedServico ?? ''}
          onChange={(e) => setSelectedServico(Number(e.target.value) || null)}
        >
          <option value="">Selecione um serviço</option>
          {servicos.map((s) => (
            <option key={s.Id_Servico} value={s.Id_Servico}>
              {s.Nome} - € {s.Valor}
            </option>
          ))}
        </select>

        {/* Funcionário (opcional) */}
        {selectedServico && (
          <select
            className="w-full border p-2 mb-4 rounded"
            value={selectedFuncionario ?? ''}
            onChange={(e) => setSelectedFuncionario(Number(e.target.value) || null)}
          >
            <option value="">Selecione um profissional (opcional)</option>
            {funcionarios.map((f) => (
              <option key={f.Id_Funcionario} value={f.Id_Funcionario}>
                {f.Nome}
              </option>
            ))}
          </select>
        )}

        {/* Cliente (modo funcionário) */}
        {madeByFuncionario && (
          <div className="mb-4">
            <label className="block mb-1 text-sm">Cliente</label>
            {(loadingClientes || internalLoadingClientes) ? (
              <div className="text-sm text-gray-500">Carregando clientes...</div>
            ) : (
              <select
                className="w-full border p-2 mb-2 rounded"
                value={selectedCliente ?? ''}
                onChange={(e) => setSelectedCliente(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Selecione um cliente</option>
                {(clientes ?? internalClientes ?? []).map((c) => (
                  <option key={c.Id_Cliente} value={c.Id_Cliente}>
                    {c.Nome || `Cliente #${c.Id_Cliente}`}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Calendário (dias inativos desabilitados) */}
        {selectedServico && (
          <div className="mb-4">
            <label className="block mb-1 text-sm">Escolha o dia:</label>
            <DatePicker
              selected={dataSelecionada}
              onChange={(date) => setDataSelecionada(date)}
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
              className="w-full border p-2 rounded"
              minDate={new Date()}
              filterDate={filterDate} // <— só deixa escolher dias com disponibilidade ativa
              placeholderText={enabledDatesSet.size ? 'Selecione um dia disponível' : 'Sem dias disponíveis'}
            />
            {selectedServico && enabledDatesSet.size === 0 && (
              <div className="mt-2 text-xs text-red-600">Sem disponibilidade ativa para este serviço.</div>
            )}
          </div>
        )}

        {/* Horários (apenas slots válidos) */}
        {dataSelecionada && horarios.length > 0 && (
          <div className="mb-4">
            <label className="block mb-1 text-sm">Horário disponível:</label>
            <div className="grid grid-cols-3 gap-2 max-h-56 overflow-auto pr-1">
              {horarios.map((h) => (
                <button
                  key={h}
                  onClick={() => setHorarioSelecionado(h)}
                  className={`py-1 px-2 border rounded text-sm ${horarioSelecionado === h ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}
        {dataSelecionada && horarios.length === 0 && (
          <div className="mb-4 text-sm text-red-600">Nenhum horário disponível para esta data.</div>
        )}

        {/* Pagamento */}
        {selectedServico && (
          <div className="mb-4">
            <label className="block mb-1 text-sm">Modalidade de pagamento:</label>
            <select
              className="w-full border p-2 mb-2 rounded"
              value={modalidadePagamento}
              onChange={(e) => setModalidadePagamento(e.target.value as 'Online' | 'Presencial')}
            >
              <option value="Online">Online</option>
              <option value="Presencial">Presencial</option>
            </select>
          </div>
        )}

        {/* Observações */}
        <div className="mt-3">
          <label className="block text-sm font-medium mb-1">Observações</label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
            placeholder="Anote observações do agendamento (opcional)"
          />
        </div>

        {/* CTA */}
        {horarioSelecionado && (
          <button
            type="button"
            onClick={handleAgendar}
            disabled={agendando}
            className={`mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition ${agendando ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {agendando ? (isEditing ? 'Atualizando...' : 'Agendando...') : (isEditing ? 'Guardar Alterações' : 'Confirmar Agendamento')}
          </button>
        )}

        <Button
          variant="secondary"
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-600 hover:underline text-center"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
