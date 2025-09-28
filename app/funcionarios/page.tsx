'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from '@/components/sideBar';
import Button from '@/components/ui/button';
import { FormularioModal } from '@/components/ui/form';

// Tipagens locais
interface Funcionario {
  Id_Funcionario: number;
  Nome: string;
  Email: string;
  Administrador: boolean;
}

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

export default function FuncionarioPage() {
  const { data: session } = useSession();
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editAgendamento, setEditAgendamento] = useState<Agendamento | null>(null);
  const [statusEdit, setStatusEdit] = useState<string>('');

  // Buscar dados do funcionário logado
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchFuncionario = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/interna/funcionarios/by-email?email=${session.user.email}`
        );
        const data = await res.json();
        setFuncionario(data);
      } catch (err) {
        console.error('Erro ao buscar funcionário:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionario();
  }, [session?.user?.email]);

  // Buscar agendamentos do funcionário logado
  useEffect(() => {
    if (!funcionario?.Id_Funcionario) return;

    const fetchAgendamentos = async () => {
      try {
        const res = await fetch(
          `/api/interna/agendamentos?funcionarioId=${funcionario.Id_Funcionario}`
        );
        const data = await res.json();
        setAgendamentos(data);
      } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
      }
    };

    fetchAgendamentos();
  }, [funcionario?.Id_Funcionario]);

  // Atualizar email/senha do funcionário
  const handleSubmit = async (formData: Record<string, string>) => {
    if (!funcionario) return;

    const { email, senha } = formData;

    try {
      await fetch(`/api/interna/funcionarios/${funcionario.Id_Funcionario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      setFuncionario((prev) =>
        prev ? { ...prev, Email: email || prev.Email } : prev
      );
    } catch (err) {
      console.error('Erro ao atualizar funcionário:', err);
    } finally {
      setOpenForm(false);
    }
  };

  // Atualizar status do agendamento
  const handleStatusUpdate = async (agendamentoId: number, status: string) => {
    try {
      await fetch(`/api/interna/agendamentos/${agendamentoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Status: status }),
      });

      setAgendamentos((prev) =>
        prev.map((a) =>
          a.Id_Agendamento === agendamentoId ? { ...a, Status: status } : a
        )
      );
    } catch (err) {
      console.error('Erro ao atualizar status do agendamento:', err);
    } finally {
      setEditAgendamento(null);
      setStatusEdit('');
    }
  };

  if (loading) {
    return <div className="p-8">Carregando...</div>;
  }

  if (!funcionario) {
    return <div className="p-8 text-red-600">Funcionário não encontrado.</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Perfil do Funcionário</h1>

          {/* Bloco de perfil */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="mb-2">
              <span className="font-semibold">Nome:</span> {funcionario.Nome}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Email:</span> {funcionario.Email}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Administrador:</span>{' '}
              {funcionario.Administrador ? 'Sim' : 'Não'}
            </div>

            <Button
              variant="primary"
              className="mt-4"
              onClick={() => setOpenForm(true)}
            >
              Editar Email/Senha
            </Button>
          </div>

          {/* Bloco de agendamentos */}
          <h2 className="text-xl font-semibold mb-2">Meus Agendamentos</h2>
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            {agendamentos.length === 0 ? (
              <div className="text-gray-500">Nenhum agendamento encontrado.</div>
            ) : (
              <table className="w-full text-sm">
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
                      <td className="p-2">
                        {a.HoraInicio ? a.HoraInicio.slice(0, 5) : '-'}
                      </td>
                      <td className="p-2">
                        {a.HoraFinal ? a.HoraFinal.slice(0, 5) : '-'}
                      </td>
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
                      <td className="p-2">
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
            )}
          </div>
        </div>

        {/* Modal para editar email/senha */}
        <FormularioModal
          showEmail
          showSenha
          isOpen={openForm}
          setOpen={setOpenForm}
          onSubmit={handleSubmit}
          initialData={{
            email: funcionario.Email,
          }}
        />
      </main>

      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

