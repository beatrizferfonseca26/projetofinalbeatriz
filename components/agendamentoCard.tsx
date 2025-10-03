'use client';

import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';


export type AgendamentoCardProps = {
  servico: string;
  profissional?: string | null;
  data: string;
  hora: string;
  local?: string | null;
  valor?: number | null;
  status?: string;
  idAgendamento?: number;
  onStatusChange?: (novoStatus: string) => void;
};

export default function AgendamentoCard({
  servico,
  profissional,
  data,
  hora,
  local,
  valor,
  status,
  idAgendamento,
  onStatusChange,
}: AgendamentoCardProps) {
  const [alterando, setAlterando] = useState(false);
  const dataFormatada = data
    ? new Date(data).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit' })
    : 'Data não informada';

  const horaFormatada = hora || 'Horário não informado';
  const valorFormatado = typeof valor === 'number' ? `€ ${valor.toFixed(2)}` : 'Valor não informado';
  const profissionalFormatado = profissional || 'Não atribuído';
  const localFormatado = local || 'Local não informado';

  // Função para alterar status
  async function alterarStatus(novoStatus: 'Confirmado' | 'Cancelado') {
    if (!idAgendamento) return;
    setAlterando(true);
    try {
      const res = await fetch('/api/interna/agendamentos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Id_Agendamento: idAgendamento, Status: novoStatus }),
      });
      if (res.ok) {
        if (onStatusChange) onStatusChange(novoStatus);
        // Opcional: feedback visual
      } else {
        alert('Erro ao alterar status');
      }
    } catch {
      alert('Erro ao alterar status');
    } finally {
      setAlterando(false);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-5 transition hover:shadow-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{servico}</h4>

      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Profissional:</span> {profissionalFormatado}
      </p>

      <div className="flex items-center text-sm text-gray-600 mb-1">
        <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
        {dataFormatada}
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-1">
        <Clock className="w-4 h-4 mr-2 text-gray-500" />
        {horaFormatada}
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-1">
        <span className="font-medium mr-2">Valor:</span>
        {valorFormatado}
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-2">
        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
        {localFormatado}
      </div>

      {/* Botão de alterar status */}
      {idAgendamento && (
        <div className="flex gap-2 mt-2">
          <button
            className={`px-3 py-1 rounded ${status === 'Confirmado' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'} disabled:opacity-50`}
            disabled={alterando || status === 'Confirmado'}
            onClick={() => alterarStatus('Confirmado')}
          >
            Confirmar
          </button>
          <button
            className={`px-3 py-1 rounded ${status === 'Cancelado' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'} disabled:opacity-50`}
            disabled={alterando || status === 'Cancelado'}
            onClick={() => alterarStatus('Cancelado')}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
