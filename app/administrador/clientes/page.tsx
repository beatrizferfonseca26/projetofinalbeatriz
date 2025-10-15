'use client';

import { useEffect, useState } from "react";
import Sidebar from "@/components/sideBar";
import { toast } from "react-toastify";
import Button from "@/components/ui/button";

interface Cliente {
  Id_Cliente: number;
  Nome: string | null;
  Email: string | null;
  Nif: string | null;
  Telemovel?: string | null;
  Morada?: string | null;
  DataNascimento?: string | null;
  Senha?: string | null;
  agendamentos?: any[];
}

export default function ClientesAdminPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Cliente | null>(null); // cliente em edição
  const [formData, setFormData] = useState<Partial<Cliente>>({});
  const [isCreating, setIsCreating] = useState(false);

  const [filtroAgendamento, setFiltroAgendamento] = useState<"todos" | "comAgendamento" | "semAgendamento">("todos");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroNif, setFiltroNif] = useState("");

  // 🔹 Buscar clientes
  async function fetchClientes() {
    try {
      const res = await fetch("/api/interna/admin/clientes", { credentials: "include" });
      const data = await res.json();
      setClientes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar clientes:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClientes();
  }, []);

  // 🔹 Atualizar cliente
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editando) return;

    try {
      const res = await fetch(`/api/interna/admin/clientes/${editando.Id_Cliente}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao atualizar cliente");

      setEditando(null);
      await fetchClientes();
      toast.success("Cliente atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar cliente");
    }
  }

  // 🔹 Excluir cliente
  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      const res = await fetch(`/api/interna/admin/clientes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir cliente");
      setClientes(clientes.filter(c => c.Id_Cliente !== id));
      toast.success("Cliente excluído com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir cliente");
    }
  }

  // 🔹 Criar cliente (novo)
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const body = {
        Nome: formData.Nome ?? null,
        Email: formData.Email ?? null,
        Nif: formData.Nif ?? null,
        Telemovel: formData.Telemovel ?? null,
        Morada: formData.Morada ?? null,
        DataNascimento: formData.DataNascimento ?? null,
        Senha: formData.Senha ?? null,
      };

      const res = await fetch("/api/interna/admin/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || "Erro ao criar cliente");
      }

      toast.success("Cliente criado com sucesso!");
      setIsCreating(false);
      setFormData({});
      await fetchClientes();
    } catch (err) {
      console.error(err);
      toast.error(String((err as Error).message || "Erro ao criar cliente"));
    }
  }

  // 🔹 Filtros
  const clientesFiltrados = Array.isArray(clientes) ? clientes.filter((c) => {
    // Filtro por agendamento
    if (filtroAgendamento === "comAgendamento" && (!c.agendamentos || c.agendamentos.length === 0)) {
      return false;
    }
    if (filtroAgendamento === "semAgendamento" && c.agendamentos && c.agendamentos.length > 0) return false;
    if (filtroEmail && !(c.Email || "").toLowerCase().includes(filtroEmail.toLowerCase())) return false;
    // garantir string antes de usar includes
    if (filtroNif && !String(c.Nif ?? "").includes(String(filtroNif))) return false;
    return true;
  }) : [];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  setEditando(null);
                  setFormData({});
                  setIsCreating(true);
                }}
              >
                Novo Cliente
              </Button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Agendamento</label>
              <select
                value={filtroAgendamento}
                onChange={e => setFiltroAgendamento(e.target.value as any)}
                className="border rounded p-2"
              >
                <option value="todos">Todos</option>
                <option value="comAgendamento">Com Agendamento</option>
                <option value="semAgendamento">Sem Agendamento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="text"
                value={filtroEmail}
                onChange={e => setFiltroEmail(e.target.value)}
                className="border rounded p-2"
                placeholder="Buscar por email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">NIF</label>
              <input
                type="text"
                value={filtroNif}
                onChange={e => setFiltroNif(e.target.value)}
                className="border rounded p-2"
                placeholder="Buscar por NIF"
              />
            </div>
          </div>

          {/* Tabela */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {loading ? (
              <p className="p-4 text-gray-600">Carregando...</p>
            ) : clientesFiltrados.length === 0 ? (
              <p className="p-4 text-gray-600">Nenhum cliente encontrado.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-3">Nome</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">NIF</th>
                    <th className="p-3">Telemóvel</th>
                    <th className="p-3">Morada</th>
                    <th className="p-3">Data Nascimento</th>
                    <th className="p-3">Agendamentos</th>
                    <th className="p-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesFiltrados.map((c) => (
                    <tr key={c.Id_Cliente} className="border-t hover:bg-gray-50">
                      <td className="p-3">{c.Nome || "—"}</td>
                      <td className="p-3">{c.Email || "—"}</td>
                      <td className="p-3">{c.Nif || "—"}</td>
                      <td className="p-3">{c.Telemovel || "—"}</td>
                      <td className="p-3">{c.Morada || "—"}</td>
                      <td className="p-3">{c.DataNascimento ? new Date(c.DataNascimento).toLocaleDateString() : "—"}</td>
                      <td className="p-3">
                        {c.agendamentos && c.agendamentos.length > 0 ? c.agendamentos.length : "—"}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setEditando(c);
                              setFormData(c);
                            }}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleDelete(c.Id_Cliente)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        {/* Modal de edição */}
        {editando && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
              <form onSubmit={handleSave} className="space-y-3">
                <input
                  type="text"
                  placeholder="Nome"
                  value={formData.Nome || ""}
                  onChange={(e) => setFormData({ ...formData, Nome: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.Email || ""}
                  onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Telemóvel"
                  value={formData.Telemovel || ""}
                  onChange={(e) => setFormData({ ...formData, Telemovel: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Morada"
                  value={formData.Morada || ""}
                  onChange={(e) => setFormData({ ...formData, Morada: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="NIF"
                  value={formData.Nif || ""}
                  onChange={(e) => setFormData({ ...formData, Nif: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="password"
                  placeholder="Palavra-passe (deixe em branco para manter)"
                  value={formData.Senha || ""}
                  onChange={(e) => setFormData({ ...formData, Senha: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setEditando(null);
                      setIsCreating(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                  >
                    Guardar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de criação (Novo Cliente) */}
        {isCreating && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Novo Cliente</h2>
              <form onSubmit={handleCreate} className="space-y-3">
                <input
                  type="text"
                  placeholder="Nome"
                  value={formData.Nome || ""}
                  onChange={(e) => setFormData({ ...formData, Nome: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.Email || ""}
                  onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Telemóvel"
                  value={formData.Telemovel || ""}
                  onChange={(e) => setFormData({ ...formData, Telemovel: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Morada"
                  value={formData.Morada || ""}
                  onChange={(e) => setFormData({ ...formData, Morada: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="NIF"
                  value={formData.Nif || ""}
                  onChange={(e) => setFormData({ ...formData, Nif: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="password"
                  placeholder="Palavra-passe"
                  value={formData.Senha || ""}
                  onChange={(e) => setFormData({ ...formData, Senha: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="date"
                  placeholder="Data de Nascimento"
                  value={formData.DataNascimento ?? ""}
                  onChange={(e) => setFormData({ ...formData, DataNascimento: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsCreating(false);
                      setFormData({});
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit">
                    Criar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
