'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/sideBar';
import AgendamentoCard from '@/components/agendamentoCard';
import Button from '@/components/ui/button';
import { toast } from 'react-toastify';

type Agendamento = {
  Id_Agendamento: number;
  Data: string;
  HoraInicio: string;
  HoraFinal: string;
  Status: string;
  Servico: string;
  Duracao: number;
  Valor: number;
  Cliente: string;
  Funcionario: string | null;
};

export default function AgendamentosRealizadosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  // Status que consideramos como "realizados" (ajuste conforme DB)
  const realizadosStatus = ['concluido', 'concluído', 'realizado', 'finalizado', 'feito'];

  const fetchAgendamentos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/interna/clientes/agendamentos');
      const data: any = await res.json();
      const lista: Agendamento[] = Array.isArray(data.agendamentos) ? data.agendamentos : [];

      // mostrar somente realizados (case-insensitive) E sem status vazio
      const realizados = lista.filter((a) => {
        const s = (a.Status ?? '').toString().toLowerCase().trim();
        return s !== '' && realizadosStatus.includes(s);
      });

      setAgendamentos(realizados);
    } catch (error) {
      console.error('Erro ao carregar agendamentos realizados:', error);
      toast.error('Erro ao carregar agendamentos realizados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Agendamentos Realizados</h2>
          <Button
            variant="secondary"
            onClick={() => fetchAgendamentos()}
            className="px-3 py-1 rounded"
          >
            Atualizar
          </Button>
        </div>

        {loading && <p className="text-gray-500">Carregando agendamentos realizados...</p>}

        {!loading && agendamentos.length === 0 ? (
          <p className="text-gray-500">Nenhum agendamento realizado encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agendamentos.map((item) => (
              <AgendamentoCard
                key={item.Id_Agendamento}
                servico={item.Servico}
                profissional={item.Funcionario || 'Não atribuído'}
                data={item.Data}
                hora={`${item.HoraInicio} - ${item.HoraFinal}`}
                valor={item.Valor}
                local="Unidade Padrão"
                status={item.Status}
                idAgendamento={item.Id_Agendamento}
                // desativa botões/ações no cartão de realizados
                showActions={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}