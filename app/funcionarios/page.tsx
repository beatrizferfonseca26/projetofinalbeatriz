// app/funcionarios/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  Button  from "@/components/ui/button"; 

interface Funcionario {
  Id_Funcionario: number;
  Nome: string;
  Email: string;
  Telefone?: string;
  Administrador: boolean;
}

export default function FuncionariosPage() {
  const router = useRouter();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFuncionarios = async () => {
    try {
      const res = await fetch("/api/internas/administrador/funcionarios");
      const data = await res.json();
      setFuncionarios(data || []);
    } catch (err) {
      console.error("Erro ao buscar funcionários:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este funcionário?")) return;
    try {
      await fetch(`/api/internas/administrador/funcionarios/${id}`, {
        method: "DELETE",
      });
      setFuncionarios(funcionarios.filter(f => f.Id_Funcionario !== id));
    } catch (err) {
      console.error("Erro ao excluir funcionário:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Funcionários</h1>

      <Button variant="primary" onClick={() => router.push("/funcionarios/novo")}>
        Novo Funcionário
      </Button>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="w-full mt-4 table-auto border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Nome</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Telefone</th>
              <th className="border px-4 py-2">Administrador</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map(f => (
              <tr key={f.Id_Funcionario}>
                <td className="border px-4 py-2">{f.Nome}</td>
                <td className="border px-4 py-2">{f.Email}</td>
                <td className="border px-4 py-2">{f.Telefone || "-"}</td>
                <td className="border px-4 py-2">{f.Administrador ? "Sim" : "Não"}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <Button variant="secondary" onClick={() => router.push(`/funcionarios/editar/${f.Id_Funcionario}`)}>
                    Editar
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(f.Id_Funcionario)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
