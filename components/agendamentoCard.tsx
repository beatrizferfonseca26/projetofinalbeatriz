'use client';

import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/button';
import { toast } from 'react-toastify';


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
  onEdit?: (id?: number) => void;
  showActions?: boolean; // when false, hide action buttons and controls
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
  onEdit,
  showActions = true,
}: AgendamentoCardProps) {
  const [alterando, setAlterando] = useState(false);
  const dataFormatada = data
    ? new Date(data).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit' })
    : 'Data não informada';

  const horaFormatada = hora || 'Horário não informado';
  const valorFormatado = typeof valor === 'number' ? `€ ${valor.toFixed(2)}` : 'Valor não informado';
  const profissionalFormatado = profissional || 'Não atribuído';
  const localFormatado = local || 'Local não informado';

  // considerar status "realizado" para ocultar ações (case-insensitive)
  const realizadosStatus = ['concluido', 'concluído', 'realizado', 'finalizado', 'feito'];
  const isRealizado = realizadosStatus.includes((status ?? '').toString().toLowerCase().trim());
  
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
        toast.error('Erro ao alterar status');
      }
    } catch {
      toast.error('Erro ao alterar status');
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

      <div className="status">
        <span>{status ?? 'Desconhecido'}</span>
      </div>
      {/* mostrar ações somente se showActions não for explicitamente false e não for realizado */}
      {showActions && !isRealizado && (
        <div className="actions flex gap-2 mt-3">
          {/* botões de ação (editar, cancelar, confirmar) alinhados lado a lado */}
              <Button
            variant="primary"
            disabled={alterando || status === 'Confirmado'}
            loadingText="Confirmando..."
            onClick={() => alterarStatus('Confirmado')}
          >
            ✔️ Confirmar
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (typeof onEdit === 'function') onEdit(idAgendamento);
            }}
          >
            ✏️ Editar
          </Button>
          <Button
            variant="secondary"
            disabled={alterando || status === 'Cancelado'}
            loadingText="Cancelando..."
            onClick={() => alterarStatus('Cancelado')}
          >
            ❌ Cancelar
          </Button>
        </div>
      )}
    </div>
  );
}
