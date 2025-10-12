'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/sideBar';
import Button from '@/components/ui/button';
import { toast } from 'react-toastify';

export default function ClientesFuncionario() {
  const [clients, setClients] = useState<any[]>([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any | null>(null);

  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    Telemovel: '',
    Senha: '',
    DataNascimento: '',
    Morada: '',
    Nif: '',
  });

  // Buscar lista de clientes
  const fetchClients = async () => {
    setClientsLoading(true);
    try {
      const res = await fetch('/api/interna/funcionarios/clientes');
      if (!res.ok) {
        setClients([]);
        return;
      }
      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.clientes)
        ? data.clientes
        : [];
      setClients(list);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setClients([]);
    } finally {
      setClientsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const openCreateClient = () => {
    setEditingClient(null);
    setForm({
      Nome: '',
      Email: '',
      Telemovel: '',
      Senha: '',
      DataNascimento: '',
      Morada: '',
      Nif: '',
    });
    setClientModalOpen(true);
  };

  const openEditClient = (c: any) => {
    setEditingClient(c);
    setForm({
      Nome: c.Nome || '',
      Email: c.Email || '',
      Telemovel: c.Telemovel || '',
      Senha: '',
      DataNascimento: c.DataNascimento ? c.DataNascimento.split('T')[0] : '',
      Morada: c.Morada || '',
      Nif: c.Nif ? String(c.Nif) : '',
    });
    setClientModalOpen(true);
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        Nif: form.Nif ? Number(form.Nif) : null,
        DataNascimento: form.DataNascimento ? new Date(form.DataNascimento) : null,
      };

      if (editingClient?.Id_Cliente) {
        const res = await fetch(`/api/interna/clientes/${editingClient.Id_Cliente}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Erro ao editar cliente');
      } else {
        const res = await fetch('/api/interna/clientes/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Erro ao criar cliente');
      }

      await fetchClients();
      setClientModalOpen(false);
      setEditingClient(null);
      toast.success('Cliente salvo com sucesso.');
    } catch (err) {
      console.error('Erro ao salvar cliente:', err);
      toast.error('Erro ao salvar cliente.');
    }
  };

  const handleDeleteClient = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    try {
      const res = await fetch(`/api/interna/clientes/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro ao excluir cliente');
      await fetchClients();
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
      toast.error('Erro ao excluir cliente.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <Button variant="primary" onClick={openCreateClient}>
            Novo Cliente
          </Button>
        </div>

        {clientsLoading ? (
          <div>Carregando...</div>
        ) : clients.length === 0 ? (
          <div className="text-gray-500">Nenhum cliente encontrado.</div>
        ) : (
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Nome</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Telemóvel</th>
                  <th className="p-2">NIF</th>
                  <th className="p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.Id_Cliente} className="border-t">
                    <td className="p-2">{c.Nome || '-'}</td>
                    <td className="p-2">{c.Email || '-'}</td>
                    <td className="p-2">{c.Telemovel || '-'}</td>
                    <td className="p-2">{c.Nif || '-'}</td>
                    <td className="p-2 flex justify-center gap-2">
                      <Button variant="secondary" onClick={() => openEditClient(c)}>
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {clientModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
              </h2>

              <form onSubmit={handleSaveClient} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    value={form.Nome}
                    onChange={(e) => setForm({ ...form, Nome: e.target.value })}
                    className="border rounded w-full px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={form.Email}
                    onChange={(e) => setForm({ ...form, Email: e.target.value })}
                    className="border rounded w-full px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Telemóvel</label>
                  <input
                    type="text"
                    value={form.Telemovel}
                    onChange={(e) => setForm({ ...form, Telemovel: e.target.value })}
                    className="border rounded w-full px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                  <input
                    type="date"
                    value={form.DataNascimento}
                    onChange={(e) => setForm({ ...form, DataNascimento: e.target.value })}
                    className="border rounded w-full px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Morada</label>
                  <input
                    type="text"
                    value={form.Morada}
                    onChange={(e) => setForm({ ...form, Morada: e.target.value })}
                    className="border rounded w-full px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">NIF</label>
                  <input
                    type="number"
                    value={form.Nif}
                    onChange={(e) => setForm({ ...form, Nif: e.target.value })}
                    className="border rounded w-full px-3 py-2"
                  />
                </div>

                {!editingClient && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Senha</label>
                    <input
                      type="password"
                      value={form.Senha}
                      onChange={(e) => setForm({ ...form, Senha: e.target.value })}
                      className="border rounded w-full px-3 py-2"
                      required
                    />
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="secondary" onClick={() => setClientModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit">
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
