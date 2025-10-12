'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/sideBar';
import AgendamentoCard from '@/components/agendamentoCard';
import AgendamentoModal from '@/components/agendamentoModal';
import Button from '@/components/ui/button';
import { toast } from 'react-toastify';
import Link from 'next/link';

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

// Função para calcular HoraFinal
function calcularHoraFinal(horaInicio: string, duracao: number): string {
  const [h, m] = horaInicio.split(':').map(Number);
  const inicio = new Date();
  inicio.setHours(h, m, 0, 0);

  const fim = new Date(inicio.getTime() + duracao * 60000);

  const hh = String(fim.getHours()).padStart(2, '0');
  const mm = String(fim.getMinutes()).padStart(2, '0');

  return `${hh}:${mm}`;
}

export default function AgendamentosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgendamento, setEditingAgendamento] = useState<Agendamento | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  const realizadosStatus = ['concluido', 'concluído', 'realizado', 'finalizado', 'feito'];

  const fetchAgendamentos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/interna/clientes/agendamentos');
      const data = await res.json();
      const lista: Agendamento[] = Array.isArray(data.agendamentos) ? (data.agendamentos as Agendamento[]) : [];

      // EXCLUIR os que já estão realizados (case-insensitive)
      const filtrados = lista.filter((a: Agendamento) => {
        const s = (a.Status ?? '').toString().toLowerCase();
        return !realizadosStatus.includes(s);
      });

      setAgendamentos(filtrados);
    } catch (err) {
      console.error('Erro ao buscar agendamentos:', err);
      toast.error('Erro ao carregar agendamentos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  // Handler que será passado ao modal
  // ✅ correto (espera HoraFinal, como o modal envia)
  const handleNovoAgendamento = async (dados: {
    Data: string;
    HoraInicio: string;
    HoraFinal: string;
    Id_Servico: number;
    Id_Funcionario?: number | null;
    Observacoes?: string;
  }) => {
    try {
      const res = await fetch('/api/interna/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (res.ok) {
        toast.success('Agendamento criado com sucesso!');
        fetchAgendamentos(); // recarregar lista
      } else {
        const err = await res.json().catch(() => null);
        toast.error(err?.error || 'Erro ao criar agendamento.');
      }
    } catch {
      toast.error('Erro inesperado.');
    }
  };

  // Abrir modal em modo de edição
  const handleEdit = (id?: number) => {
    if (!id) return;
    const ag = agendamentos.find((a) => a.Id_Agendamento === id) || null;
    if (!ag) return;
    setEditingAgendamento(ag);
    setIsModalOpen(true);
  };

  // Callback quando edição salva
  const handleEditSaved = async (dados: any) => {
    // dados deve conter os campos atualizados
    try {
      const res = await fetch('/api/interna/agendamentos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (res.ok) {
        toast.success('Agendamento atualizado com sucesso!');
        fetchAgendamentos();
        setEditingAgendamento(null);
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        toast.error(err?.error || 'Erro ao atualizar agendamento.');
      }
    } catch (e) {
      toast.error('Erro inesperado ao atualizar.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col p-8">
        {/* Título e botão no topo */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Meus Agendamentos</h2>

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Novo Agendamento
            </Button>

            {/* Link para a página de realizados */}
            <Link href="/clientes/agendamentos/realizados">
              <Button variant="secondary" className="px-3 py-2 rounded">
                Ver Realizados
              </Button>
            </Link>
          </div>
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
                hora={`${item.HoraInicio} - ${item.HoraFinal}`}
                valor={item.Valor}
                local="Unidade Padrão"
                status={item.Status}
                idAgendamento={item.Id_Agendamento}
                onStatusChange={() => fetchAgendamentos()}
                onEdit={(id) => handleEdit(id)}
              />
            ))}
          </div>
        )}

        {/* Modal para novo agendamento */}
        <AgendamentoModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAgendamento(null);
          }}
          onAgendamentoCriado={handleNovoAgendamento}
          isEditing={!!editingAgendamento}
          initialData={editingAgendamento ? {
            Id_Agendamento: editingAgendamento.Id_Agendamento,
            Data: editingAgendamento.Data,
            HoraInicio: editingAgendamento.HoraInicio,
            HoraFinal: editingAgendamento.HoraFinal,
            Id_Servico: undefined,
            Id_Funcionario: undefined,
            Observacoes: undefined,
          } : null}
          onEditSaved={handleEditSaved}
        />
      </div>
    </div>
  );
}
