'use client';

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
};

export default function AgendamentoModal({
  isOpen,
  onClose,
  onAgendamentoCriado,
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

  const handleAgendar = async () => {
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
      Observacoes: '',
    };

    try {
      const res = await fetch('/api/interna/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (res.ok) {
        toast.success('Agendamento realizado com sucesso!');
        onAgendamentoCriado(dados);
        onClose();
      } else {
        toast.error('Erro ao realizar agendamento.');
      }
    } catch {
      toast.error('Erro inesperado ao agendar.');
    } finally {
      setAgendando(false);
    }
  };

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

    {horarioSelecionado && (
      <button
        type="button"
        onClick={handleAgendar}
        disabled={agendando}
        className={`mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition ${agendando ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {agendando ? 'Agendando...' : 'Confirmar Agendamento'}
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
