'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/sideBar';
import AgendamentoCard from '@/components/agendamentoCard';
import AgendamentoModal from '@/components/agendamentoModal';
import Button from '@/components/ui/button';

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

export default function AgendamentosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgendamentos = async () => {
    try {
      const res = await fetch('/api/interna/agendamentos');
      const data = await res.json();
      setAgendamentos(data);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
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
        {/* Título e botão no topo */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Meus Agendamentos</h2>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Novo Agendamento
          </Button>
        </div>

        {/* Estado de carregamento */}
        {loading && <p className="text-gray-500">Carregando agendamentos...</p>}

        {/* Lista de agendamentos */}
        {!loading && agendamentos.length === 0 ? (
          <p className="text-gray-500">Nenhum agendamento encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agendamentos.map((item) => (
              <AgendamentoCard
                key={item.Id_Agendamento}
                servico={item.Servico}
                profissional={item.Funcionario || 'Não atribuído'}
                data={item.Data}
                hora={item.HoraInicio}
                valor={item.Valor}
                local="Unidade Padrão"
              />
            ))}
          </div>
        )}

        {/* Modal para novo agendamento */}
        <AgendamentoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAgendamentoCriado={fetchAgendamentos} 
        />
      </div>
    </div>
  );
}
