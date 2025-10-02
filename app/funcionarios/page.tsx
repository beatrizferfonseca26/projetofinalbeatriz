'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/sideBar';

interface Funcionario {
  Id_Funcionario: number;
  Nome: string;
  Email: string;
  Administrador: boolean;
}

export default function FuncionarioPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal de edição do perfil
  const [openForm, setOpenForm] = useState(false);

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchFuncionario = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/interna/funcionarios`);
        const funcionarios = await res.json();
        const data = funcionarios.find((f: Funcionario) => f.Email === session.user.email);
        setFuncionario(data);

        if (data) {
          setNome(data.Nome);
          setEmail(data.Email);
        }
      } catch (err) {
        console.error('Erro ao buscar funcionário:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionario();
  }, [session?.user?.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!funcionario) return;

    try {
      await fetch(`/api/interna/funcionarios/${funcionario.Id_Funcionario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      setFuncionario((prev) =>
        prev ? { ...prev, Nome: nome || prev.Nome, Email: email || prev.Email } : prev
      );
    } catch (err) {
      console.error('Erro ao atualizar funcionário:', err);
    } finally {
      setOpenForm(false);
      setSenha(''); // limpa campo senha
    }
  };

  if (loading) {
    return <div className="p-8">Carregando...</div>;
  }

  if (!funcionario) {
    return <div className="p-8 text-red-600">Funcionário não encontrado.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-800">Área do Funcionário</h1>

            <section className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Bem-vindo, {funcionario.Nome}!
              </h2>
              <p className="text-gray-600">
                Aqui você pode gerenciar seus agendamentos, editar seu perfil e acessar
                funções administrativas (se disponível).
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => router.push('/funcionarios/agendamentos')}
                className="cursor-pointer bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-medium text-gray-700 mb-2">Meus Agendamentos</h3>
                <p className="text-sm text-gray-600">
                  Visualize e edite os agendamentos atribuídos a você.
                </p>
              </div>

              <div
                onClick={() => setOpenForm(true)}
                className="cursor-pointer bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-medium text-gray-700 mb-2">Editar Perfil</h3>
                <p className="text-sm text-gray-600">
                  Atualize seu nome, email ou senha de acesso.
                </p>
              </div>

              {funcionario.Administrador && (
                <div
                  onClick={() => router.push('/funcionarios/gestao')}
                  className="cursor-pointer bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition"
                >
                  <h3 className="font-medium text-gray-700 mb-2">Gestão de Funcionários</h3>
                  <p className="text-sm text-gray-600">
                    Adicione ou gerencie os dados de outros funcionários.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal do formulário */}
      {openForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setOpenForm(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Editar Funcionário</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Senha <span className="text-xs text-gray-500">(preencha para alterar)</span>
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full border rounded p-2"
                  placeholder="Nova senha (opcional)"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setOpenForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
