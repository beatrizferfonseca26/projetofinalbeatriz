'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import Button from './ui/button';

type Servico = {
  Id_Servico: number;
  Nome: string;
  Descricao: string;
  Duracao: number;
  Valor: number;
};

type Funcionario = {
  Id_Funcionario: number;
  Nome: string;
};

type AgendamentoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAgendamentoCriado: () => void;
};

export default function AgendamentoModal({
  isOpen,
  onClose,
  onAgendamentoCriado,
}: AgendamentoModalProps) {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [selectedServico, setSelectedServico] = useState<number | null>(null);
  const [selectedFuncionario, setSelectedFuncionario] = useState<number | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarios, setHorarios] = useState<string[]>([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);

  // Buscar serviços e funcionários
  useEffect(() => {
    if (!isOpen) return;

    fetch('/api/interna/servicos/disponibilidade')
      .then((res) => res.json())
      .then(setServicos)
      .catch(() => toast.error('Erro ao carregar serviços'));

    fetch('/api/interna/funcionarios')
      .then((res) => res.json())
      .then(setFuncionarios)
      .catch(() => toast.error('Erro ao carregar funcionários'));
  }, [isOpen]);

  // Gerar horários disponíveis
  useEffect(() => {
    if (!dataSelecionada) return;

    const generated: string[] = [];
    for (let h = 9; h <= 17; h++) {
      generated.push(`${h.toString().padStart(2, '0')}:00`);
      generated.push(`${h.toString().padStart(2, '0')}:30`);
    }
    setHorarios(generated);
    setHorarioSelecionado(null);
  }, [dataSelecionada]);

  const handleAgendar = async () => {
    if (!selectedServico || !dataSelecionada || !horarioSelecionado) {
      toast.error('Preencha todos os campos obrigatórios antes de confirmar.');
      return;
    }

    const body = {
      Id_Servico: selectedServico,
      Id_Funcionario: selectedFuncionario, // pode ser null
      Data: format(dataSelecionada, 'yyyy-MM-dd'),
      HoraInicio: horarioSelecionado,
      Observacoes: '',
    };

    try {
      const res = await fetch('/api/interna/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success('Agendamento realizado com sucesso!');
        onAgendamentoCriado();
        onClose();
      } else {
        toast.error('Erro ao realizar agendamento.');
      }
    } catch {
      toast.error('Erro inesperado ao agendar.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Agendar Serviço</h2>

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
        {dataSelecionada && (
          <div className="mb-4">
            <label className="block mb-1 text-sm">Horário disponível:</label>
            <div className="grid grid-cols-3 gap-2">
              {horarios.map((h) => (
                <button
                  key={h}
                  onClick={() => setHorarioSelecionado(h)}
                  className={`py-1 px-2 border rounded text-sm ${
                    horarioSelecionado === h
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

        {/* Botão Agendar */}
        {horarioSelecionado && (
          <Button
            variant="primary"
            onClick={handleAgendar}
            className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Confirmar Agendamento
          </Button>
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
