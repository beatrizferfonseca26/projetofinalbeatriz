'use client';

import { CalendarDays, Clock, MapPin } from 'lucide-react';

type AgendamentoCardProps = {
  servico: string;
  profissional: string;
  data: string; 
  hora: string; 
  local: string;
  valor: number,
};

export default function AgendamentoCard({
  servico,
  profissional,
  data,
  hora,
  local,
  valor,
}: AgendamentoCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 transition hover:shadow-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{servico}</h4>

      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Profissional:</span> {profissional}
      </p>

     <div className="flex items-center text-sm text-gray-600 mb-1">
        <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
        {new Date(data).toLocaleDateString('pt-pt', { day: '2-digit', month: '2-digit', year: '2-digit' })}
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-1">
        <Clock className="w-4 h-4 mr-2 text-gray-500" />
        {hora}
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <span className="font-medium mr-2">Valor:</span> 
        {typeof valor === 'number' ? `R$ ${valor.toFixed(2)}` : 'Valor não informado'}
      </div>

      <div className="flex items-center text-sm text-gray-600">
        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
        {local}
      </div>
    </div>
  );
}
