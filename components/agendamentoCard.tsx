'use client';

import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/button';


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

      {/* Botão de alterar status - destaque visual */}
      {idAgendamento && (
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="mb-1 text-base font-semibold">
            Status atual:
            {status === 'Confirmado' && (
              <span className="ml-2 px-2 py-1 rounded bg-green-100 text-green-800 border border-green-400">✔️ Confirmado</span>
            )}
            {status === 'Cancelado' && (
              <span className="ml-2 px-2 py-1 rounded bg-red-100 text-red-800 border border-red-400">❌ Cancelado</span>
            )}
            {!status && (
              <span className="ml-2 px-2 py-1 rounded bg-gray-100 text-gray-800 border border-gray-300">Pendente</span>
            )}
          </div>
          <div className="flex gap-4 w-full" style={{ justifyItems: 'center' }}>
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
              disabled={alterando || status === 'Cancelado'}
              loadingText="Cancelando..."
              onClick={() => alterarStatus('Cancelado')}
            >
              ❌ Cancelar
            </Button>
            {/* Mostrar botão de editar apenas se NÃO estiver confirmado */}
            {status !== 'Confirmado' && idAgendamento && (
              <Button
                variant="secondary"
                onClick={() => {
                  if (typeof onEdit === 'function') onEdit(idAgendamento);
                }}
              >
                ✏️ Editar
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
