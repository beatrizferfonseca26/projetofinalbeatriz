'use client';

import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { format, addMinutes, parse, isSameDay } from 'date-fns';
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

type AgendamentoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAgendamentoCriado: (dados: {
    Data: string;
    HoraInicio: string;
    HoraFinal: string;
    Id_Servico: number;
    Id_Funcionario?: number | null;
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
    Observacoes?: string | null;
  } | null;
  onEditSaved?: (dados: any) => void | Promise<void>;
};

export default function AgendamentoModal({
  isOpen,
  onClose,
  onAgendamentoCriado,
  isEditing = false,
  initialData = null,
  onEditSaved,
}: AgendamentoModalProps) {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidade[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [selectedServico, setSelectedServico] = useState<number | null>(null);
  const [selectedFuncionario, setSelectedFuncionario] = useState<number | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarios, setHorarios] = useState<string[]>([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [agendando, setAgendando] = useState(false);
  const [modalidadePagamento, setModalidadePagamento] = useState<'Online' | 'Presencial'>('Online');
  // add observacoes state
  const [observacoes, setObservacoes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // preencher quando for editar
  useEffect(() => {
    if (!isOpen) return;
    if (isEditing && initialData) {
      // Preencher serviço e funcionário
      if (initialData.Id_Servico) setSelectedServico(initialData.Id_Servico);
      if (initialData.Id_Funcionario) setSelectedFuncionario(initialData.Id_Funcionario);
      if (initialData.Data) setDataSelecionada(new Date(initialData.Data + 'T00:00:00'));
      if (initialData.HoraInicio) setHorarioSelecionado(initialData.HoraInicio);
    } else {
      // reset
      setSelectedServico(null);
      setSelectedFuncionario(null);
      setDataSelecionada(null);
      setHorarios([]);
      setHorarioSelecionado(null);
    }
  }, [isOpen, isEditing, initialData]);

  // Buscar serviços e funcionários
  useEffect(() => {
    if (!isOpen) return;

    fetch('/api/interna/servicos/disponibilidade')
      .then((res) => res.json())
      .then((data) => {
        // data.servicosDisponiveis: [{..., disponibilidadeprod: [...] }]
        setServicos(data.servicosDisponiveis || []);
      })
      .catch(() => toast.error('Erro ao carregar serviços'));

    fetch('/api/interna/funcionarios')
      .then((res) => res.json())
      .then(setFuncionarios)
      .catch(() => toast.error('Erro ao carregar funcionários'));
  }, [isOpen]);

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

    // Montar DateTime para cálculo do horário final
    const inicio = parse(horarioSelecionado, 'HH:mm', dataSelecionada);
    const final = addMinutes(inicio, servico.Duracao);

    const dados = {
      Id_Servico: selectedServico,
      Id_Funcionario: selectedFuncionario,
      Data: format(dataSelecionada, 'yyyy-MM-dd'),
      HoraInicio: format(inicio, 'HH:mm'),
      HoraFinal: format(final, 'HH:mm'),
      Observacoes: observacoes || null,
      ModalidadePagamento: modalidadePagamento,
    };

    try {
      if (isEditing && initialData && onEditSaved) {
        // Delegate update to parent handler to avoid duplicate requests
        const payload = {
          Id_Agendamento: initialData.Id_Agendamento,
          Id_Servico: dados.Id_Servico,
          Id_Funcionario: dados.Id_Funcionario,
          Data: dados.Data,
          HoraInicio: dados.HoraInicio,
          Observacoes: dados.Observacoes || null,
        };
        try {
          await onEditSaved(payload);
        } catch (e) {
          // Parent will surface error via toast; show a fallback
          toast.error('Erro ao atualizar agendamento.');
        }
      } else {
        const res = await fetch('/api/interna/agendamentos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        });

        if (res.ok) {
          toast.success('Agendamento realizado com sucesso!');
          // Prepare callback data matching onAgendamentoCriado signature (no null values)
          const callbackDados = {
            Data: dados.Data,
            HoraInicio: dados.HoraInicio,
            HoraFinal: dados.HoraFinal,
            Id_Servico: dados.Id_Servico,
            Id_Funcionario: dados.Id_Funcionario ?? undefined,
            Observacoes: dados.Observacoes ?? undefined,
          };
          onAgendamentoCriado(callbackDados);
          onClose();
        } else {
          toast.error('Erro ao realizar agendamento.');
        }
      }
    } catch {
      toast.error('Erro inesperado ao agendar.');
    } finally {
      setAgendando(false);
    }
  }, 500);

  async function handleSave() {
    if (isSubmitting) return;
    // validações locais aqui...
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
      Observacoes: observacoes ?? undefined,
    };

    try {
      setIsSubmitting(true);
      const result = await onAgendamentoCriado(payload);

      // Se o parent retorna Response, você pode checar status e agir aqui
      // o retorno de onAgendamentoCriado é tipado como void, então primeiro convertemos para any
      // e só então verificamos se tem a propriedade 'ok' para tratar como Response.
      const resultAny = result as any;
      if (resultAny && typeof resultAny.ok === 'boolean') {
        const res = resultAny as Response;
        if (!res.ok) {
          // opcional: mostrar erro localmente (não sucessos aqui)
          const errBody = await res.json().catch(() => null);
          console.error('Erro no create (modal):', errBody);
          setIsSubmitting(false);
          return;
        }
      }

      // fechar modal apenas após o parent confirmar sucesso
      onClose();
    } catch (err) {
      console.error('Erro ao salvar agendamento (modal):', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"> <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"> <h2 className="text-lg font-semibold mb-4 text-center">Agendar Serviço</h2>

    {/* Select Serviço */}
    <select
      className="w-full border p-2 mb-4 rounded"
      value={selectedServico ?? ''}
      onChange={(e) => setSelectedServico(Number(e.target.value))}
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
        onChange={(e) => setSelectedFuncionario(Number(e.target.value))}
      >
        <option value="">Selecione um profissional (opcional)</option>
        {funcionarios.map((f) => (
          <option key={f.Id_Funcionario} value={f.Id_Funcionario}>
            {f.Nome}
          </option>
        ))}
      </select>
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
              className={`py-1 px-2 border rounded text-sm ${horarioSelecionado === h
                ? 'bg-black text-white'
                : 'bg-gray-100 hover:bg-gray-200'
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

    {/* Botão Agendar */}

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
