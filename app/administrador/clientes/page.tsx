'use client';

import { useEffect, useState } from "react";
import Sidebar from "@/components/sideBar";

interface Cliente {
  Id_Cliente: number;
  Nome: string | null;
  Email: string | null;
  Nif: string | null;
  Telemovel?: string | null;
  Morada?: string | null;
  DataNascimento?: string | null;
  agendamentos?: any[]; // Ajuste conforme necessário
}

export default function ClientesAdminPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [filtroAgendamento, setFiltroAgendamento] = useState<"todos" | "comAgendamento" | "semAgendamento">("todos");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroNif, setFiltroNif] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      const res = await fetch("/api/interna/clientes");
      const data = await res.json();
      setClientes(data || []);
      setLoading(false);
    };
    fetchClientes();
  }, []);

  // Aplicar filtros
  const clientesFiltrados = clientes.filter((c) => {
    // Filtro por agendamento
    if (filtroAgendamento === "comAgendamento" && (!c.agendamentos || c.agendamentos.length === 0)) {
      return false;
    }
    if (filtroAgendamento === "semAgendamento" && c.agendamentos && c.agendamentos.length > 0) {
      return false;
    }
    // Filtro por email
    if (filtroEmail && !(c.Email || "").toLowerCase().includes(filtroEmail.toLowerCase())) {
      return false;
    }
    // Filtro por NIF
    if (filtroNif && !(c.Nif || "").includes(filtroNif)) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
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
                        {c.agendamentos && c.agendamentos.length > 0
                          ? c.agendamentos.length
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
        <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
          <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}