'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import Button from './ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';


type Servico = {
  Id_Servico: number;
  Nome: string;
  Descricao: string;
  Duracao: number;
  Valor: number;
};

type AgendamentoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AgendamentoModal({ isOpen, onClose }: AgendamentoModalProps) {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [selectedServico, setSelectedServico] = useState<number | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarios, setHorarios] = useState<string[]>([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);

  // Buscar serviços disponíveis
  useEffect(() => {
    if (isOpen) {
      fetch('/api/interna/servicos/disponibilidade')
        .then(res => res.json())
        .then(data => setServicos(data));
    }
  }, [isOpen]);

  // Mock: Gerar horários disponíveis após selecionar data
  useEffect(() => {
    if (dataSelecionada) {
      const generated = [];
      for (let h = 9; h <= 17; h++) {
        generated.push(`${h.toString().padStart(2, '0')}:00`);
        generated.push(`${h.toString().padStart(2, '0')}:30`);
      }
      setHorarios(generated);
      setHorarioSelecionado(null);
    }
  }, [dataSelecionada]);


  // identificar o cliente logado
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (session?.user) {
      console.log('Usuário logado:', session.user);
    }
  }, [session]);
  const handleAgendar = async () => {

    if (!selectedServico || !dataSelecionada || !horarioSelecionado) return;

    const body = {
      Id_Servico: selectedServico,
      Id_Cliente: session?.user?.Id_Cliente, 
      Data: format(dataSelecionada, 'yyyy-MM-dd'),
      HoraInicio: horarioSelecionado,
      Observacoes: '',
    };

    const res = await fetch('/api/interna/agendamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success('Agendamento realizado com sucesso!');
      onClose();
    } else {
      toast.error('Erro ao realizar agendamento.');
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
                  className={`py-1 px-2 border rounded text-sm ${horarioSelecionado === h ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
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
            variant='primary'
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
