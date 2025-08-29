'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  Button from "@/components/ui/button"; 

interface Funcionario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  administrador: boolean;
}

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Buscar lista de funcionários
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const res = await fetch("/api/internas/administrador/funcionarios");
        const data = await res.json();
        setFuncionarios(data || []);
      } catch (err) {
        console.error("Erro ao carregar funcionários", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFuncionarios();
  }, []);

  // Excluir funcionário
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este funcionário?")) return;

    try {
      const res = await fetch(`/api/internas/administrador/funcionarios/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFuncionarios((prev) => prev.filter((f) => f.id !== id));
      } else {
        console.error("Erro ao excluir funcionário");
      }
    } catch (err) {
      console.error("Erro de conexão", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Conteúdo */}
      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Funcionários</h1>
          <Button variant="primary" onClick={() => router.push("/administrador/funcionarios/novo")}>
            Novo Funcionário
          </Button>
        </div>

        {/* Tabela */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading ? (
            <p className="p-4 text-gray-600">Carregando...</p>
          ) : funcionarios.length === 0 ? (
            <p className="p-4 text-gray-600">Nenhum funcionário cadastrado.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Nome</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Telefone</th>
                  <th className="p-3">Administrador</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((f) => (
                  <tr key={f.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{f.nome}</td>
                    <td className="p-3">{f.email}</td>
                    <td className="p-3">{f.telefone || "-"}</td>
                    <td className="p-3">{f.administrador ? "Sim" : "Não"}</td>
                    <td className="p-3 flex gap-3 justify-center">
                      <button
                        onClick={() => router.push(`/administrador/funcionarios/${f.id}/editar`)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Rodapé fixo */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        <p className="text-sm">© {new Date().getFullYear()} Administração - Funcionários</p>
      </footer>
    </div>
  );
}
