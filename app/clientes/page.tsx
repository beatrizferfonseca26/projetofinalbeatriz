'use client';

import Sidebar from '@/components/sideBar';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '@/components/ui/button';

export default function ClientesPage() {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);

  // estados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [morada, setMorada] = useState('');
  const [nif, setNif] = useState('');
  const [senhaVisible, setSenhaVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchClienteByEmail = async (emailParam: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/interna/clientes?email=${encodeURIComponent(emailParam)}`);
      const data = await res.json();
      if (res.ok) {
        setNome(data.Nome || '');
        setEmail(data.Email || '');
        setTelemovel(data.Telemovel || '');
        setSenha('');
        setDataNascimento(
          data.DataNascimento ? new Date(data.DataNascimento).toISOString().split('T')[0] : ''
        );
        setMorada(data.Morada || '');
        setNif(data.Nif?.toString() || '');
        return true;
      } else {
        console.error('Erro:', data.message || data);
        return false;
      }
    } catch (err) {
      console.error('Erro ao buscar cliente por email:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchClienteCurrent = async () => {
    setLoading(true);
    try {
      // 1) tentar rota dedicada que retorne o cliente atual 
      let res = await fetch('/api/interna/clientes/me');
      if (res.ok) {
        const data = await res.json();
        setNome(data.Nome || '');
        setEmail(data.Email || '');
        setTelemovel(data.Telemovel || '');
        setSenha('');
        setDataNascimento(
          data.DataNascimento ? new Date(data.DataNascimento).toISOString().split('T')[0] : ''
        );
        setMorada(data.Morada || '');
        setNif(data.Nif?.toString() || '');
        return;
      }

      // 2) tentar rota sem query (alguns backends usam sessão)
      res = await fetch('/api/interna/clientes');
      if (res.ok) {
        const data = await res.json();
        setNome(data.Nome || '');
        setEmail(data.Email || '');
        setTelemovel(data.Telemovel || '');
        setSenha('');
        setDataNascimento(
          data.DataNascimento ? new Date(data.DataNascimento).toISOString().split('T')[0] : ''
        );
        setMorada(data.Morada || '');
        setNif(data.Nif?.toString() || '');
        return;
      }

      // 3) fallback: tentar buscar email em localStorage e usar fetchClienteByEmail
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        const ok = await fetchClienteByEmail(storedEmail);
        if (ok) return;
      }

      toast.error('Não foi possível carregar os dados do cliente. Faça login novamente.');
    } catch (err) {
      console.error('Erro ao buscar cliente atual:', err);
      toast.error('Erro ao carregar dados do cliente.');
    } finally {
      setLoading(false);
    }
  };

  // sempre que abrir o form, busca os dados do cliente logado
  useEffect(() => {
    if (openForm) {
      // primeiro tenta carregar via sessão/rota dedicada, se não usar fallback para localStorage
      fetchClienteCurrent();
    }
  }, [openForm]);

  // Submeter dados
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // validação cliente-side
    if (nif && nif.length !== 6) {
      toast.error('NIF deve ter exatamente 6 dígitos.');
      return;
    }

    setLoading(true);
    try {
      const body = {
        Nome: nome || null,
        Email: email || null,
        Telemovel: telemovel || null,
        Senha: senha ? senha : null,
        // enviar como ISO string para evitar problemas de serialização no servidor
        DataNascimento: dataNascimento ? new Date(dataNascimento).toISOString() : null,
        Morada: morada || null,
        Nif: nif ? Number(nif) : null,
      };

      console.log('Dados enviados:', body);

      const res = await fetch('/api/interna/clientes/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // tratar respostas não-json
      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok && data?.success) {
        toast.success('Conta atualizada com sucesso!');
        setSenha('');
        setOpenForm(false); // fechar apenas em sucesso
      } else {
        const msg = data?.error || data?.message || `Erro ao atualizar (status ${res.status})`;
        toast.error(msg);
      }
    } catch (err) {
      console.error('Erro ao submeter formulário:', err);
      toast.error('Erro inesperado ao atualizar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* Sidebar lateral */}
        <Sidebar />

        {/* Conteúdo principal */}
        <main className="flex-1 p-6 md:p-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-800">Área do Cliente</h1>

            <section className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Bem-vindo à sua conta!
              </h2>
              <p className="text-gray-600">
                Aqui você pode gerenciar seus agendamentos, visualizar seus serviços,
                atualizar seu perfil e muito mais.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => router.push('/clientes/agendamentos')}
                className="cursor-pointer bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-medium text-gray-700 mb-2">Meus Agendamentos</h3>
                <p className="text-sm text-gray-600">
                  Visualize ou edite os agendamentos futuros e passados.
                </p>
              </div>

              <div
                onClick={() => setOpenForm(true)}
                className="cursor-pointer bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-medium text-gray-700 mb-2">Editar Perfil</h3>
                <p className="text-sm text-gray-600">
                  Atualize seus dados pessoais, como nome, e-mail e senha.
                </p>
              </div>
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
            <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>

            {loading ? (
              <p className="text-gray-500 text-center">Carregando dados...</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telemóvel</label>
                  <input
                    type="text"
                    value={telemovel}
                    onChange={(e) => setTelemovel(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Senha</label>
                  <input
                    value={senha}
                    type={senhaVisible ? 'text' : 'password'}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                  <input
                    type="date"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Morada</label>
                  <input
                    type="text"
                    value={morada}
                    onChange={(e) => setMorada(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">NIF</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    value={nif}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setNif(digits);
                    }}
                    className="w-full border rounded p-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Máx. 6 dígitos — apenas números.</p>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant='secondary'
                    type="button"
                    onClick={() => setOpenForm(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Guardar
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Rodapé fixo */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
