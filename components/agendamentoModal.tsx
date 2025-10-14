'use client';

import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { format, addMinutes, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import Button from './ui/button';

type Disponibilidade = {
  Id_Disponibilidade: number;
  Data: string; // yyyy-MM-dd
  HoraInicio: string; // HH:mm
  HoraFinal: string; // HH:mm
};

type Servico = {
  Id_Servico: number;
  Nome: string;
  Descricao: string;
  Duracao: number;
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
  // Optional - edit mode props
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
  // optional: provide clientes list (for funcionario mode)
  clientes?: Cliente[];
  loadingClientes?: boolean;
  // when true, show cliente selector and require/select cliente
  madeByFuncionario?: boolean;
};

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
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidade[]>([]);
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // preencher quando for editar
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

  // Buscar serviços e funcionários
  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      try {
        // serviços
        const resServ = await fetch('/api/interna/servicos/disponibilidade');
        console.log('GET /api/interna/servicos/disponibilidade ->', resServ.status);
        if (!resServ.ok) {
          const txt = await resServ.text().catch(() => null);
          console.error('Serviços endpoint error body:', txt);
          toast.error('Erro ao carregar serviços');
        } else {
          const data = await resServ.json().catch(() => null);
          setServicos(data?.servicosDisponiveis || []);
        }

        // funcionários
        const resFunc = await fetch('/api/interna/funcionarios');
        console.log('GET /api/interna/funcionarios ->', resFunc.status);
        if (!resFunc.ok) {
          const txt = await resFunc.text().catch(() => null);
          console.error('Funcionarios endpoint error body:', txt);
          toast.error('Erro ao carregar funcionários');
        } else {
          const dataF = await resFunc.json().catch(() => []);
          setFuncionarios(Array.isArray(dataF) ? dataF : []);
        }
      } catch (err) {
        console.error('Erro ao buscar serviços/funcionarios:', err);
        toast.error('Erro ao carregar dados iniciais');
      }
    })();
  }, [isOpen]);

  // Carregar clientes quando modal aberto em modo "feito por funcionário"
  useEffect(() => {
    if (!isOpen || !madeByFuncionario) return;
    let mounted = true;
    setInternalLoadingClientes(true);
    (async () => {
      try {
        const res = await fetch('/api/interna/funcionarios/clientes');
        console.log('GET /api/interna/funcionarios/clientes ->', res.status);
        if (!res.ok) {
          const body = await res.text().catch(() => null);
          console.error('Clientes (funcionarios) error body:', body);
          toast.error('Erro ao carregar clientes');
          if (mounted) setInternalClientes([]);
          return;
        }
        const data = await res.json().catch(() => null);
        const list = Array.isArray(data) ? data : Array.isArray(data?.clientes) ? data.clientes : [];
        if (mounted) setInternalClientes(list);
      } catch (err) {
        console.error('Erro ao carregar clientes (funcionários):', err);
        toast.error('Erro ao carregar clientes');
        if (mounted) setInternalClientes([]);
      } finally {
        if (mounted) setInternalLoadingClientes(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [isOpen, madeByFuncionario]);

  // Gerar horários disponíveis
  useEffect(() => {
    if (!selectedServico || !dataSelecionada) {
      setHorarios([]);
      setHorarioSelecionado(null);
      return;
    }
    // Gera horários fixos das 09:00 às 18:00 a cada 30 minutos
    const horariosGerados: string[] = [];
    for (let h = 9; h < 18; h++) {
      horariosGerados.push(`${h.toString().padStart(2, '0')}:00`);
      horariosGerados.push(`${h.toString().padStart(2, '0')}:30`);
    }
    setHorarios(horariosGerados);
    setHorarioSelecionado(null);
  }, [selectedServico, dataSelecionada]);

  // Resetar funcionário se mudar serviço
  useEffect(() => {
    setSelectedFuncionario(null);
  }, [selectedServico]);
  const handleAgendar = debounce(async () => {
    if (agendando) return;
    setAgendando(true);

    if (!selectedServico || !dataSelecionada || !horarioSelecionado) {
      toast.error('Preencha todos os campos obrigatórios antes de confirmar.');
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

    // se modo funcionario, cliente é obrigatório
    if (madeByFuncionario && !selectedCliente) {
      toast.error('Selecione o cliente para este agendamento.');
      setAgendando(false);
      return;
    }

    // Preparar dados baseado no contexto
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
          Id_Cliente: selectedCliente, // obrigatório para funcionários
          Modalidade: modalidadePagamento, // formato esperado pela rota de funcionários
          Valor: servico.Valor, // valor do serviço
        }
      : {
          ...dadosBase,
          Id_Funcionario: selectedFuncionario,
          Id_Cliente: selectedCliente ?? undefined,
          ModalidadePagamento: modalidadePagamento, // formato esperado pela rota geral
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
        try {
          await onEditSaved(payload);
        } catch (e) {
          toast.error('Erro ao atualizar agendamento.');
        }
      } else {
        // 🚀 Usa a rota correta baseada no contexto
        const endpoint = madeByFuncionario 
          ? '/api/interna/funcionarios/agendamentos' 
          : '/api/interna/agendamentos';
        
        console.log(`POST ${endpoint}`, dados);
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => null);
          console.error('Erro ao agendar:', res.status, txt);
          toast.error(`Erro ao realizar agendamento: ${txt || res.status}`);
        } else {
          toast.success('Agendamento realizado com sucesso!');
          const callbackDados = {
            Data: dadosBase.Data,
            HoraInicio: dadosBase.HoraInicio,
            HoraFinal: dadosBase.HoraFinal,
            Id_Servico: dadosBase.Id_Servico,
            Id_Funcionario: selectedFuncionario ?? undefined,
            Id_Cliente: selectedCliente ?? undefined,
            Observacoes: dadosBase.Observacoes ?? undefined,
          };
          onAgendamentoCriado(callbackDados);
          onClose();
        }
      }
    } catch (err) {
      console.error('Erro inesperado ao agendar:', err);
      toast.error('Erro inesperado ao agendar.');
    } finally {
      setAgendando(false);
    }
  }, 500);


  async function handleSave() {
    if (isSubmitting) return;
    if (!selectedServico || !dataSelecionada || !horarioSelecionado) {
      toast.error('Preencha todos os campos obrigatórios antes de salvar.');
      return;
    }

    const payload = {
      Data: format(dataSelecionada, 'yyyy-MM-dd'),
      HoraInicio: horarioSelecionado,
      HoraFinal: horarioSelecionado,
      Id_Servico: selectedServico,
      Id_Funcionario: selectedFuncionario ?? undefined,
      Id_Cliente: selectedCliente ?? undefined,
      Observacoes: observacoes ?? undefined,
    };

    try {
      setIsSubmitting(true);
      const result = await onAgendamentoCriado(payload);
      const resultAny = result as any;
      if (resultAny && typeof resultAny.ok === 'boolean') {
        const res = resultAny as Response;
        if (!res.ok) {
          const errBody = await res.json().catch(() => null);
          console.error('Erro no create (modal):', errBody);
          setIsSubmitting(false);
          return;
        }
      }
      onClose();
    } catch (err) {
      console.error('Erro ao salvar agendamento (modal):', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Agendar Serviço</h2>

        {/* Select Serviço */}
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

        {/* Select Funcionário (opcional) */}
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

        {/* Se o agendamento for criado pelo funcionário, mostrar selector de clientes */}
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

        {/* Calendário */}
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
            />
          </div>
        )}

        {/* Horários */}
        {dataSelecionada && horarios.length > 0 && (
          <div className="mb-4">
            <label className="block mb-1 text-sm">Horário disponível:</label>
            <div className="grid grid-cols-3 gap-2">
              {horarios.map((h) => (
                <button
                  key={h}
                  onClick={() => setHorarioSelecionado(h)}
                  className={`py-1 px-2 border rounded text-sm ${horarioSelecionado === h ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
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

        {/* Observações textarea */}
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

        {horarioSelecionado && (
          <button
            type="button"
            onClick={handleAgendar}
            disabled={agendando}
            className={`mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition ${agendando ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {agendando ? (isEditing ? 'Atualizando...' : 'Agendando...') : (isEditing ? 'Salvar Alterações' : 'Confirmar Agendamento')}
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
