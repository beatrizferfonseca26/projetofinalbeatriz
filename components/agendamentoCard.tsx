'use client';

import { CalendarDays, Clock, MapPin } from 'lucide-react';

export type AgendamentoCardProps = {
  servico: string;
  profissional?: string | null;
  data: string;
  hora: string;
  local?: string | null;
  valor?: number | null;
};

export default function AgendamentoCard({
  servico,
  profissional,
  data,
  hora,
  local,
  valor,
}: AgendamentoCardProps) {
  const dataFormatada = data
    ? new Date(data).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit' })
    : 'Data não informada';

  const horaFormatada = hora || 'Horário não informado';
  const valorFormatado = typeof valor === 'number' ? `€ ${valor.toFixed(2)}` : 'Valor não informado';
  const profissionalFormatado = profissional || 'Não atribuído';
  const localFormatado = local || 'Local não informado';

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

      <div className="flex items-center text-sm text-gray-600">
        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
        {localFormatado}
      </div>
    </div>
  );
}
