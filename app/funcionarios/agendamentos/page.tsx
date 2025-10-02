'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from '@/components/sideBar';
import Button from '@/components/ui/button';

interface Agendamento {
  Id_Agendamento: number;
  Data: string | null;
  HoraInicio: string | null;
  HoraFinal: string | null;
  Status: string | null;
  servicos: {
    Nome: string | null;
  };
  clientes: {
    Nome: string | null;
  };
}

export default function AgendamentosFuncionario() {
  const { data: session } = useSession();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [editAgendamento, setEditAgendamento] = useState<Agendamento | null>(null);
  const [statusEdit, setStatusEdit] = useState<string>('');

  // Buscar agendamentos do funcionário logado
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchAgendamentos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/interna/funcionarios/agendamentos?email=${session.user.email}`);
        const data = await res.json();
        setAgendamentos(data);
      } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, [session?.user?.email]);

  // Atualizar status
  const handleStatusUpdate = async (Id_Agendamento: number, Status: string) => {
    try {
      const res = await fetch(`/api/interna/funcionarios/agendamentos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Id_Agendamento, Status }),
      });

      if (!res.ok) {
        throw new Error('Erro ao atualizar agendamento');
      }

      setAgendamentos((prev) =>
        prev.map((a) =>
          a.Id_Agendamento === Id_Agendamento ? { ...a, Status } : a
        )
      );
    } catch (err) {
      console.error('Erro ao atualizar status do agendamento:', err);
    } finally {
      setEditAgendamento(null);
      setStatusEdit('');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-2xl font-bold mb-4">Meus Agendamentos</h1>

        {loading ? (
          <div>Carregando...</div>
        ) : agendamentos.length === 0 ? (
          <div className="text-gray-500">Nenhum agendamento encontrado.</div>
        ) : (
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto text-center">
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Cliente</th>
                  <th className="p-2">Serviço</th>
                  <th className="p-2">Data</th>
                  <th className="p-2">Hora Início</th>
                  <th className="p-2">Hora Final</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {agendamentos.map((a) => (
                  <tr key={a.Id_Agendamento} className="border-t">
                    <td className="p-2">{a.clientes?.Nome || '-'}</td>
                    <td className="p-2">{a.servicos?.Nome || '-'}</td>
                    <td className="p-2">
                      {a.Data ? new Date(a.Data).toLocaleDateString() : '-'}
                    </td>
                    <td className="p-2">{a.HoraInicio || '-'}</td>
                    <td className="p-2">{a.HoraFinal || '-'}</td>
                    <td className="p-2">
                      {editAgendamento?.Id_Agendamento === a.Id_Agendamento ? (
                        <select
                          value={statusEdit}
                          onChange={(e) => setStatusEdit(e.target.value)}
                          className="border rounded px-2 py-1"
                        >
                          <option value="">Selecione</option>
                          <option value="Realizado">Realizado</option>
                          <option value="Confirmado">Confirmado</option>
                          <option value="Cancelado">Cancelado</option>
                          <option value="Marcado">Marcado</option>
                        </select>
                      ) : (
                        a.Status || '-'
                      )}
                    </td>
                    <td className="p-2 text-left">
                      {editAgendamento?.Id_Agendamento === a.Id_Agendamento ? (
                        <div className="flex gap-2">
                          <Button
                            variant="primary"
                            onClick={() =>
                              handleStatusUpdate(a.Id_Agendamento, statusEdit)
                            }
                            disabled={!statusEdit}
                          >
                            Salvar
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setEditAgendamento(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setEditAgendamento(a);
                            setStatusEdit(a.Status || '');
                          }}
                        >
                          Editar Status
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
