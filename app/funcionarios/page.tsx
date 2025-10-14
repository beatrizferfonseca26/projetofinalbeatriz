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
  // pega também o status para sabermos quando a sessão carregou
  const { data: session, status } = useSession();
  const router = useRouter();

  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [loading, setLoading] = useState(true);

  // estados do perfil
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [openForm, setOpenForm] = useState(false);

  // --- Abas: Meus Agendamentos | Editar Perfil | Gerir Clientes ---
  const [activeTab, setActiveTab] = useState<'agendamentos' | 'perfil' | 'clientes'>('agendamentos');

  // 🔒 Proteção de rota — redireciona se não autenticado ou se não for funcionário/admin
  useEffect(() => {
    if (status === 'loading') return; // espera a sessão carregar
    if (!session) {
      router.push('/'); // não autenticado
      return;
    }
    const tipo = (session.user as any)?.tipo; // depende de como preenches o token
    if (tipo !== 'funcionario' && tipo !== 'administrador') {
      router.push('/'); // autenticado mas sem permissão
    }
  }, [status, session, router]);

  // --- carregar dados do funcionário ---
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchFuncionario = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/interna/funcionarios`);
        const funcionarios = await res.json();
        const data = funcionarios.find((f: Funcionario) => f.Email === session.user!.email);
        setFuncionario(data || null);

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

  // enquanto a sessão está a carregar, evita flicker
  if (status === 'loading' || loading) {
    return <div className="p-8">Carregando...</div>;
  }

  if (!funcionario) {
    return <div className="p-8 text-red-600">Funcionário não encontrado.</div>;
  }

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
      setSenha('');
    }
  };

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

              <div
                onClick={() => router.push('/funcionarios/clientes')}
                className="cursor-pointer bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-medium text-gray-700 mb-2">Gerir Clientes</h3>
                <p className="text-sm text-gray-600">
                  Criar, editar e listar clientes.
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

            {activeTab === 'perfil' && (
              <section className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Editar Perfil</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      name="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome"
                      className="w-full border rounded p-2"
                    />
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full border rounded p-2"
                    />
                    <input
                      name="senha"
                      type="password"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="Senha (deixe em branco para manter)"
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button type="submit" className="px-3 py-1 bg-black text-white rounded">
                      Guardar Perfil
                    </button>
                  </div>
                </form>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
