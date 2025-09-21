"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Sidebar from "@/components/sideBar";
import { Formulario } from "@/components/ui/form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";

interface Funcionario {
  Id_Funcionario: string;
  Nome: string;
  Email: string;
  Administrador: boolean;
}

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();
  // Buscar lista de funcionários
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

  // Excluir funcionário
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
  const handleSubmit = async () => {
    try {
      if (!nome || !email || !senha) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }

      // gerar hash da senha
      const hashedPassword = await bcrypt.hash(senha, 10);

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
        setOpen(false);
        setNome("");
        setEmail("");
        setSenha("");
        toast.success("Funcionário salvo com sucesso!");
      } else {
        console.error("Erro ao salvar funcionário");
      }
    } catch (err) {
      console.error("Erro ao enviar formulário", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fixa à esquerda */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Funcionários</h1>
            <Button
              variant="primary"
              onClick={() => setOpen(true)}
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
                          onClick={() =>
                            router.push(
                              `/administrador/funcionarios/${f.Id_Funcionario}/editar`
                            )
                          }
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

        {/* Modal do formulário */}
        <Modal isOpen={open} onOpenChange={setOpen}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-lg font-bold">
                  Novo Funcionário
                </ModalHeader>
                <ModalBody>
                  <Formulario
                    showNome
                    showEmail
                    showSenha
                    showMorada={false}
                    showTelemovel={false}
                    showNif={false}
                    showDataNascimento={false}
                    
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleSubmit();
                        onClose();
                      }}
                    >
                      Salvar
                    </Button>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Rodapé fixo */}
        <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
          <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
