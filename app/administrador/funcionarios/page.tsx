"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Sidebar from "@/components/sideBar";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";

interface Funcionario {
  Id_Funcionario: string;
  Nome: string;
  Email: string;
  Administrador: boolean;
}

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editFuncionario, setEditFuncionario] = useState<Funcionario | null>(null);

  // Form states
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const res = await fetch("/api/interna/admin/funcionarios");
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

  const resetForm = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setEditFuncionario(null);
  };

  const handleOpenForm = (funcionario?: Funcionario) => {
    if (funcionario) {
      setEditFuncionario(funcionario);
      setNome(funcionario.Nome);
      setEmail(funcionario.Email);
      setSenha("");
    } else {
      resetForm();
    }
    setOpenForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || (!editFuncionario && !senha)) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    let hashedPassword = undefined;
    if (senha) {
      hashedPassword = await bcrypt.hash(senha, 10);
    }

    try {
      if (editFuncionario) {
        // Editar funcionário
        const res = await fetch(`/api/interna/admin/funcionarios/${editFuncionario.Id_Funcionario}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome,
            email,
            senha: hashedPassword, // só envia se foi preenchida
          }),
        });

        if (res.ok) {
          const atualizado = await res.json();
          setFuncionarios((prev) =>
            prev.map((f) =>
              f.Id_Funcionario === editFuncionario.Id_Funcionario ? atualizado : f
            )
          );
          setEditFuncionario(null);
          setOpenForm(false);
          toast.success("Funcionário atualizado com sucesso!");
        } else {
          console.error("Erro ao atualizar funcionário");
        }
      } else {
        // Criar novo funcionário
        const res = await fetch("/api/interna/admin/funcionarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome,
            email,
            senha: hashedPassword,
          }),
        });

        if (res.ok) {
          const novoFuncionario = await res.json();
          setFuncionarios((prev) => [...prev, novoFuncionario]);
          setOpenForm(false);
          toast.success("Funcionário salvo com sucesso!");
        } else {
          console.error("Erro ao salvar funcionário");
        }
      }
    } catch (err) {
      console.error("Erro ao enviar formulário", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este funcionário?")) return;

    try {
      const res = await fetch(`/api/interna/admin/funcionarios/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFuncionarios((prev) => prev.filter((f) => f.Id_Funcionario !== id));
      } else {
        console.error("Erro ao excluir funcionário");
      }
    } catch (err) {
      console.error("Erro de conexão", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Funcionários</h1>
            <Button
              variant="primary"
              onClick={() => handleOpenForm()}
            >
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
                    <th className="p-3">Administrador</th>
                    <th className="p-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {funcionarios.map((f) => (
                    <tr
                      key={f.Id_Funcionario}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-3">{f.Nome}</td>
                      <td className="p-3">{f.Email}</td>
                      <td className="p-3">
                        {f.Administrador ? "Sim" : "Não"}
                      </td>
                      <td className="p-3 flex gap-3 justify-center">
                        <button
                          onClick={() => handleOpenForm(f)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(f.Id_Funcionario)}
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

        {/* Modal do formulário  */}
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
              <h2 className="text-xl font-bold mb-4">
                {editFuncionario ? "Editar Funcionário" : "Novo Funcionário"}
              </h2>
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
                  <label className="block text-sm font-medium mb-1">Senha {editFuncionario && <span className="text-xs text-gray-500">(preencha para alterar)</span>}</label>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder={editFuncionario ? "Nova senha (opcional)" : "Senha"}
                    required={!editFuncionario}
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
    </div>
  );
}
